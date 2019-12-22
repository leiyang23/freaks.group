<template>
  <div class="page">

    <el-button @click="select" type="primary" icon="el-icon-folder-add" class="btn"> 选择图片</el-button>

    <form id="myForm" name="myForm">
      <input type="file" id="file" name="image" accept="image/*" @change="upload"
             style="opacity: 0;width: 0;height: 0">
    </form>

    <el-row  v-loading="loading">
      <textarea v-model="text" cols="100" rows="20"></textarea>
    </el-row>


  </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                loading:false,
                text: ""
            }
        },
        mounted() {
        },
        methods: {
            select: function () {
                document.getElementById("file").click();
            },
            upload: function () {
                let that = this;
                let data = new FormData(document.getElementById("myForm"));

                if (document.getElementById("file").files.length <= 0) {
                    that.$message.info("未选择文件！");
                    return
                }

                that.text = "";
                that.loading = true;
                that.$http({
                    method: "POST",
                    url: "/ai/ocr",
                    headers: {
                        "Content-Type": "multipart/form-data;charset=utf8"
                    },
                    data
                }).then(res => {
                    that.loading = false;
                    let data = res.data;
                    if (data.errcode == 0) {
                        if (data.data.words_result_num > 0) {
                            for (let i = 0; i < data.data.words_result_num; i++) {
                                that.text = that.text + data.data.words_result[i].words + "\n";
                            }
                        } else {
                            that.text = "未识别到文字！"
                        }
                    } else {
                        that.$message.error("服务器错误")
                    }

                }).catch(err => {
                    window.console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang="less">
.page{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn{
    margin-top: 80px;
  }
  textarea::selection{
    color: #f7775f;
    background-color: #133310;
  }
}
</style>