<template>
    <div>
        <el-row class="user" v-if="!login_status">
            
            <el-popover
              placement="right"
              width="200"
              trigger="hover">
              <el-row style="display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;">
                <el-row style="height:50px;line-height:40px">登录后可以试验更多功能哦！</el-row>
                <el-row>
                  <el-button type="primary" size="small" @click="loginFormVisiable=true">登录</el-button>
                  <el-button size="small" @click="registerFormVisiable=true">注册</el-button>            
                </el-row>
              </el-row>
              <el-avatar slot="reference" :size="60"   style="cursor: pointer;color:#fefefe;background-color:#ff677d">未登录</el-avatar>   
            </el-popover>
          </el-row>

          <el-row class="user-login" v-else @click.native="goto">
            <!-- <router-link to="/user"> -->
              <el-avatar :size="100" shape="square" :src="user.avatar" style="cursor: pointer;"></el-avatar>
            <!-- </router-link> -->
            <el-row style="font-size:12px;color:#f1f1f1;height:30px;line-height:30px">
              {{user.username}}
            </el-row>
        </el-row>

        <el-dialog title="登录" :visible.sync="loginFormVisiable" width="400px">
            <el-form :model="loginInfo">
                <el-form-item>
                <el-input v-model="loginInfo.account" placeholder="邮箱/用户名"/>
                </el-form-item>
                <el-form-item>
                <el-input v-model="loginInfo.password" placeholder="密码"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loginFormVisiable = false">取 消</el-button>
                <el-button type="primary" @click="login">登 录</el-button>
            </div>
        </el-dialog>

        <el-dialog title="注册" :visible.sync="registerFormVisiable" width="400px">
          <el-form :model="registerInfo">
            <el-form-item>
              <el-input v-model="registerInfo.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" >
                <el-input v-model="registerInfo.verifyCode" placeholder="验证码"/>
                <el-button :disabled="!registerInfo.email" @click="send_verify_code">获取验证码</el-button>
              </el-row>          
            </el-form-item>

            <el-form-item>
              <el-input v-model="registerInfo.password" placeholder="设置密码"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="registerInfo.rePassword" placeholder="重复密码"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="registerFormVisiable = false">取 消</el-button>
            <el-button type="primary" @click="register">注 册</el-button>
          </div>
        </el-dialog>
          
    </div>
</template>

<script>
export default {
    name:"User",
    data() {
          return {
            loginFormVisiable:false,
            registerFormVisiable:false,

            loginInfo:{},
            registerInfo:{},
            is_login:false

          }
        },
    computed:{
          login_status(){
            return this.$store.getters.get_login_status
          }
        },
        mounted() {
            // 检查是否有登录记录
            let user = JSON.parse(localStorage.getItem("user"))
            if (user){
              this.$store.commit("login");
              this.user = user
            }
        },
    methods: {
            goto(){
              this.$router.push("/user");
              this.$emit("goto");
            },
            login(){
              let that = this;
              // todo: 检查输入信息格式
              // 
              that.$http({
                method:"post",
                url:"/account/login",
                data: that.loginInfo
              }).then(res => {
                if(res.data.status_code == 200){
                  that.$message.success("登录成功！")
                  that.loginFormVisiable = false;
                  localStorage.setItem("token",res.data.token);
                  that.get_info()
                }else{
                  that.$message.error(res.data.msg);        
                }
              }).catch(err => {
                window.console.error(err)
                that.$message.error("网络错误！")
              })
            },
            get_info(){
              let that = this;
              that.$http({
                url:"/account/info"
              }).then(res => {
                if(res.data.status_code == 200){
                  localStorage.setItem("user",JSON.stringify(res.data.data));
                  that.user = res.data.data;
                  that.$store.commit("login");
                  that.$store.commit("set_msg_num",res.data.data.msg_num)
                }else{
                  that.$message.warning("获取用户信息失败！")
                }
                
              })
            },
            logout(){
              let that = this;

              that.$store.commit("logout");
              localStorage.removeItem("user");
              localStorage.removeItem("token");

              that.$message.info("已退出");

            },
            register(){
              let that = this;
              that.$http({
                method:"post",
                url:"/account/register",
                data:{
                  email:that.registerInfo.email,
                  password:that.registerInfo.password,
                  code: that.registerInfo.verifyCode
                }
              }).then(res => {
                if(res.data.status_code == 200){
                  that.$message.success("注册成功，已登录！");
                  that.registerFormVisiable = false;
                  localStorage.setItem("token",res.data.token);
                  that.get_info()
                }else{
                  that.$message.warning(res.data.msg);
                }
              })
            },
            send_verify_code(){
              let that = this;
              that.$http({
                method:"post",
                url:"/account/register_email_code",
                data:{
                  email:that.registerInfo.email
                }
              }).then(res => {
                if(res.data.status_code == 200){
                  that.$message.success("验证码已发送到你的邮箱，15分钟有效！")
                }else{
                  that.$message.warning(res.data.msg)
                }
              })
            }
        }

}
</script>
<style lang="less" scoped>
.user, .user-login{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height:200px;
        
      }
</style>