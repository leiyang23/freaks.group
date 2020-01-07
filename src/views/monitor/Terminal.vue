<template>
  <div class="page">
    <div class="shell">
      <div class="txt">
        <textarea id="shell" v-model="con" readonly></textarea>
      </div>

      <div class="ipt">
        <el-input v-if="conn_status" @keyup.enter.native="ws_send" v-model="send_message" class="input"
                  placeholder="按回车键发送命令"></el-input>
        <el-button v-else @click="dialogVisible=true">连接</el-button>
        <!--        <el-autocomplete @keyup.enter.native="ws_send"-->
        <!--                         @keyup.up.native="previous"-->
        <!--                         v-model="send_message"-->
        <!--                         :fetch-suggestions="querySearch"-->
        <!--                         :disabled="is_disabled"-->
        <!--                         class="input"-->
        <!--                         @select="handleSelect"></el-autocomplete>-->
        <!--        <el-button type="primary" @click="ws_send">发送</el-button>-->
      </div>
    </div>

    <el-dialog
            title="连接到远程机器"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="true"
            :center="true"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-form :model="conn_info">
        <el-form-item label="IP" label-width="100px">
          <el-input v-model="conn_info.host" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口" label-width="100px">
          <el-input v-model="conn_info.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="conn_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="conn_info.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="init_conn" :icon="iconName">连接</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {WS_BASE_URL} from '../../conf'

    export default {
        name: "Terminal",
        data() {
            return {
                input_history: [],
                iconName: "",
                socket: "",
                ws_path: WS_BASE_URL + '/ws/monitor/terminal',
                send_message: '',
                con: "",
                conn_status: false,
                dialogVisible: true,
                conn_info: {
                    "host": "",
                    "port": 22,
                    "username": "",
                    "password": ""
                },

            }
        },
        mounted() {
            this.init();
            let that = this;
            let count = 0;
            let timer = setInterval(function () {
                if (that.socket.readyState !== 1) {
                    that.init();
                    count++;
                    if (count > 3) {
                        clearInterval(timer)
                    }
                } else {
                    clearInterval(timer)
                }
            }, 15000)
        },
        methods: {
            handleClose(done) {
                this.$message.error("未连接！");
                done()
            },
            init_conn() {
                this.iconName = "el-icon-loading";
                this.socket.send(JSON.stringify({
                    "conn_info": this.conn_info,
                    "message": "init_conn"
                }));
            },
            previous() {
                this.send_message = this.input_history[0]
            },
            querySearch(queryString, cb) {
                let data = [];
                for (let i = 0; i < this.input_history.length; i++) {
                    data.push({
                        value: this.input_history[i]
                    })
                }
                cb(data)
            },
            handleSelect(item) {
                this.send_message = item.value;
                this.ws_send()
            },
            scroll_to_bottom() {
                let textarea = document.getElementById('shell');
                textarea.scrollTop = textarea.scrollHeight;
            },
            init() {
                if (typeof (WebSocket) === "undefined") {
                    this.$message.error("浏览器不支持 websocket !")
                } else {
                    this.socket = new WebSocket(this.ws_path);
                    this.socket.onopen = this.ws_open;
                    // 监听socket错误信息
                    this.socket.onerror = this.ws_error;
                    // 监听socket消息
                    this.socket.onmessage = this.ws_get_message;

                    this.socket.onclose = this.ws_close;

                }
            },
            ws_open() {
                window.console.log("conn success");
                // this.is_disabled = false;
            },
            ws_error() {
                window.console.log("conn err");
                this.conn_status = false;
                this.$notify.error({
                    title: "错误",
                    message: '连接出现错误！',
                    duration: 3000
                })
            },
            ws_get_message(msg) {
                // window.console.log(msg);
                let that = this;
                let resp = JSON.parse(msg.data);
                // window.console.log(resp);

                // 只有第一次连接验证信息时会返回 status 字段，
                if ("status" in resp) {
                    if (resp.status === "bad") {
                        that.iconName = "";
                        that.dialogVisible = true;
                        that.$message.error(resp.message);
                        return
                    } else if (resp.status === "ok") {
                        that.conn_status = true;
                        that.dialogVisible = false;
                        that.$message.success(resp.message);
                        return;
                    }

                }

                this.con = this.con + resp.message;
                setTimeout(function () {
                    that.scroll_to_bottom();
                }, 200)
            },
            ws_close() {
                window.console.warn("conn close");
                this.conn_status = false;
            },
            ws_send() {

                this.socket.send(JSON.stringify({
                    message: this.send_message
                }));
                this.input_history.unshift(this.send_message);
                if (this.input_history.length > 5) {
                    this.input_history.pop()
                }
                this.send_message = '';
            }
        },
        destroyed() {
            this.socket.close();
        }
    }
</script>

<style scoped lang="less">
  .shell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .txt {
      height: 600px;
      width: 800px;
      margin-bottom: 20px;

      textarea {
        width: 100%;
        height: 100%;
        padding:0;
        border: none;
        background-color: #263f44;
        color: #e4f9ff;
        line-height: 20px;
        font-family: sans-serif, "Times New Roman", Georgia, Serif;

      }
    }

    .ipt {
      display: flex;
      flex-direction: row;
      align-items: center;

      .input {
        width: 800px;
      }
    }

  }

</style>