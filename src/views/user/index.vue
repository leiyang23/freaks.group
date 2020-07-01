<template>
  <div>
    <div v-if="login_status">
      <div class="custom-nav">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%;">
          <el-tab-pane label="个人主页" name="selfInfo"></el-tab-pane>
          <el-tab-pane label="天气提醒" name="weatherTip"></el-tab-pane>
          <el-tab-pane name="message">
            <div slot="label">
              消息中心
              <el-badge is-dot :hidden="msg_num==0" style="margin-left: 0;margin-right: 10px"></el-badge>
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>

      <router-view name="user"/>
    </div>

    <div v-else style="display:flex;flex-direction:row;justify-content:center;align-items:center;height:400px">
      登录后才能查看本页内容！
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        computed: {
            login_status() {
                return this.$store.getters.get_login_status
            },
            msg_num() {
                return this.$store.getters.get_msg_num
            },
            activeName: {
                get: function () {
                    let val = this.$route.path.split("/").pop();
                    if (["message", "selfInfo", "weatherTip"].indexOf(val) == -1) {
                        val = "selfInfo"
                    }
                    return val
                },
                set: function () {
                    return this.$route.path.split("/").pop()
                }
            }
        },
        mounted() {
            this.get_msgs()
        },
        methods: {
            handleClick(tab, event) {
                window.console.log(event);
                this.$router.push("/user/" + tab.name)
            },
            get_msgs() {
                let that = this;
                that.$http({
                    url: "/account/msgs"
                }).then(res => {
                    if (res.data.code == 200) {
                        window.console.log(res.data)
                        that.$store.commit("set_msg_num", res.data.msg_num)
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  .custom-nav {
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    div {
      margin-left: 10px;
    }
  }
</style>