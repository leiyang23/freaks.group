<template>
  <div>
    <div class="msgs" v-if="msgs.length>0">
      <div class="msg" v-for="(msg, index) in msgs" :key="msg.id">
        <div class="con">
          <div class="title">
            <el-badge is-dot v-show="msg.status == 0"></el-badge>
            {{msg.title}}
          </div>
          <div class="date">{{msg.create_time.replace("T"," ").substr(0,19)}}</div>
          <div class="content">{{msg.content}}</div>
        </div>

        <div class="actions">
          <div class="del">
            <el-button @click="del_msg(msg.id, index)">删除</el-button>
          </div>
          <div class="read">
            <el-button @click="read_msg(msg.id, index)">已读</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="text-align: center; font-size:20px;margin-top: 100px;color: #999999">空空如也</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                msgs: []
            }
        },
        mounted() {
            this.get_msgs()
        },

        methods: {

            get_msgs() {
                let that = this;
                that.$http({
                    url: "/account/msgs"
                }).then(res => {
                    if (res.data.code == 200) {
                        that.msgs = res.data.data
                    }
                })
            },
            del_msg(id, index) {
                let that = this;
                that.$http({
                    url: "/account/msg/del/" + id
                }).then(res => {
                    if (res.data.code == 200) {
                        that.msgs.splice(index, 1);
                        that.$store.commit("reduce_msg_num", 1)
                    }
                })
            },
            read_msg(id, index) {
                let that = this;
                that.$http({
                    url: "/account/msg/read/" + id
                }).then(res => {
                    if (res.data.code == 200) {
                        that.msgs[index].status = 1;
                        that.$store.commit("reduce_msg_num", 1)
                    }
                })

            }
        }
    }
</script>

<style scoped lang="less">
  .msgs {
    .msg {
      height: 160px;
      background-color: #f7f7f7;
      margin-bottom: 20px;
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      transition: all ease-in-out .3s;

      .con {
        .title {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .date {
          font-size: 14px;
          color: #999;
          margin-bottom: 10px;
        }

        .content {
          font-size: 14px;
        }
      }

      .actions {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 10px;
        visibility: hidden;

        .del {
          margin-right: 20px;
        }
      }

      &:hover {
        cursor: pointer;
      }

      &:hover .actions {
        visibility: visible;
      }
    }
  }
</style>