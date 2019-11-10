<template>
  <div>
    <el-row :style="{height: pageHeight + 'px'}" class="main">
      <el-col :span="16" :offset="4" class="upload_area">
        <div :class="style_status">
          <el-button @click="select" type="primary" icon="el-icon-folder-add"> 选择图片</el-button>
          <el-button @click="submit" icon="el-icon-upload">上传</el-button>
          <span style="font-size: 12px;color: #aaa;margin-left: 30px">累计托管 {{statistic.count}} 张图片，已用容量 {{statistic.space | spaceFormat }} / 10 GB</span>
          <div>
            <el-progress v-show="upload_status==='progress'"
                         :percentage="upload_images.length <= 0 ? 0 : Math.floor((uploaded_num/upload_images.length)*100)"
            ></el-progress>
          </div>
        </div>

        <div class="preview">
          <transition-group name="list-complete" tag="div">
            <div class="image list-complete-item" v-for="(img,index) in pre_images" :key="index">
              <div>
                <img :src="img.url">
              </div>

              <div class="info">
                <div>{{img.name}}</div>
                <div>
                  <el-button @click="del(index)" :plain="true">删除</el-button>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </el-col>
    </el-row>
    <input type="file" id="files" name="avatar" multiple accept="image/*" @change="upload"
           style="opacity: 0;width: 0;height: 0">
  </div>
</template>

<script>
    import * as qiniu from 'qiniu-js'

    export default {
        name: "index",
        data() {
            return {
                statistic: {},
                upload_status: 'ready',
                pre_images: [],
                upload_images: [],
                uploaded_num: 0,

                pageHeight: 0
            }
        },
        filters: {
            spaceFormat(val) {
                if (val > 0 && val <= 1024 * 1024) {
                    return String(Math.floor(val / 1024)) + " KB"
                } else if (val > 1024 * 1024 && val <= 1024 * 1024 * 1024) {
                    return String(Math.floor(val / 1024 / 1024)) + " MB"
                } else if (val > 1024 * 1024 * 1024) {
                    return String(Math.floor(val / 1024 / 1024 / 1024)) + " GB"
                } else {
                    return "未知"
                }
            }
        },
        computed: {
            style_status() {
                return this.pre_images.length === 0 ? 'init' : 'top'
            }
        },
        mounted() {
            this.pageHeight = document.body.clientHeight - 40;
            this.get_statistic()
        },
        methods: {
            get_statistic() {
                let that = this;
                that.$http({
                    url: "/imgur/qiniu_data_statistic"
                }).then(res => {
                    that.statistic = res.data.data;
                })
            },
            qiniu_upload(index, file, key, token, putExtra, config) {
                let that = this;
                let observable = qiniu.upload(file, key, token, putExtra, config);
                observable.subscribe(next, error, complete);

                function next(res) {
                    window.console.log(res.total.percent)
                }

                function error(err) {
                    window.console.error(err.message)
                }

                function complete(res) {
                    that.uploaded_num++;
                    if (that.uploaded_num >= that.upload_images.length) {
                        that.upload_status = 'end'; // 上传结束
                        that.get_statistic();
                        that.$message.success("全部上传完毕！")
                    }
                    that.pre_images[index].name = "http://qiniu2.freaks.group/" + res.key;
                }
            },

            select() {
                document.getElementById("files").click();
                this.upload_status = 'ready';
                this.pre_images = [];
                this.uploaded_num = 0;
                this.upload_images = []
            },
            upload() {
                let file_list = document.getElementById("files").files;
                for (let f = 0; f < file_list.length; f++) {
                    if (file_list[f].size > 4 * 1024 * 1024) {
                        this.$message.error("单个文件最大支持 4M！");
                        return;
                    }
                }

                this.pre_images = [];
                for (let i = 0; i < file_list.length; i++) {
                    this.pre_images.push({
                        url: window.URL.createObjectURL(file_list[i]),
                        name: file_list[i].name
                    });
                    this.upload_images.push(file_list[i])
                }
            },
            submit() {
                let that = this;
                if (that.upload_status !== 'ready') {
                    that.$message.error("请重新选择文件！");
                    return;
                }
                // 验证参数
                if (that.upload_images.length <= 0) {
                    that.$message.error("未选择文件！");
                    return;
                }
                if (that.upload_images.length > 20) {
                    that.$message.error("单次最大只能上传 20 个文件！ ");
                    return;
                }
                let file_name_str = '';
                for (let i = 0; i < that.upload_images.length; i++) {
                    file_name_str = file_name_str + that.upload_images[i].name + "@@"
                }
                // 获取上传 token
                that.$http({
                    url: "/imgur/up_tokens",
                    params: {
                        file_name_str: file_name_str
                    }
                }).then(res => {
                    window.console.log(res.data.data);
                    let tokens = res.data.data;
                    that.upload_status = 'progress';
                    for (let i = 0; i < tokens.length; i++) {
                        that.qiniu_upload(i, that.upload_images[i], that.upload_images[i].name, tokens[i], {}, {})
                    }
                }).catch(err => {
                    window.console.error(err)
                })

            },
            del(index) {
                this.pre_images.splice(index, 1);
                this.upload_images.splice(index, 1);
            }
        }
    }
</script>

<style scoped lang="less">

  .main {
    .upload_area {
      width: 800px;
    }

    .init {
      margin-top: 300px;
      padding: 10px;
      box-shadow: 0 0 3px #aaaaaa;
      transition: all ease-in-out 1s;
    }

    .top {
      margin-top: 0;
      padding: 10px;
      box-shadow: 0 0 5px #aaaaaa;
      transition: all ease-in-out 1s;
      position: sticky;
      top: 1px;
      background-color: #fff;
    }

  }

  .preview {
    .list-complete-item {
      transition: all 1s;
      display: inline-block;
    }
    .list-complete-enter, .list-complete-leave-to
     {
      opacity: 0;
      transform: translateY(30px);
    }
    .list-complete-leave-active {
      position: absolute;
    }

    .image {

      width: 800px;
      box-shadow: 0 0 2px #42b983 inset;
      border-radius: 3px;
      margin-top: 10px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      &:hover {
        background-color: #f7f7f7;
      }

      div:first-child {
        font-size: 0;

        img {
          width: 100px;
          height: 80px;
        }
      }

      .info {
        width: 700px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        div:first-child {
          font-size: 12px;
          padding-left: 20px;
        }

        div:last-child {
          padding-right: 20px;
        }
      }
    }
  }
</style>