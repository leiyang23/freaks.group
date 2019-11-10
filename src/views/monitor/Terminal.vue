<template>
  <div class="page">
    <div class="shell">
      <div >
        <el-autocomplete @keyup.enter.native="ws_send"
                         @keyup.up.native="previous"
                         v-model="send_message"
                         :fetch-suggestions="querySearch"
                         :disabled="is_disabled"
                         class="input"
                         @select="handleSelect"></el-autocomplete>
        <el-button type="primary" @click="ws_send">发送</el-button>
      </div>
      <div>
        <div v-for="(msg,index) in return_messages" :key="index">
          {{msg}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {WS_BASE_URL} from '../../conf'

    export default {
        name: "Terminal",
        data() {
            return {
                input_history: [],
                socket: "",
                ws_path: WS_BASE_URL + '/ws/monitor/terminal',
                return_messages: [],
                send_message: '',
                is_disabled: false
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
                }else{
                    clearInterval(timer)
                }
            }, 15000)
        },
        methods: {
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
                this.is_disabled  = false;
            },
            ws_error() {
                window.console.log("conn err");
                this.is_disabled = true;
                this.$notify.error({
                    title: "错误",
                    message: '连接出现错误！',
                    duration: 3000
                })
            },
            ws_get_message(msg) {
                // window.console.log(msg);
                this.return_messages.push(JSON.parse(msg.data).message);
                // 滚动到底部
                let div = document.querySelector(".shell");
                div.scrollTop = Number.MAX_SAFE_INTEGER;
            },
            ws_close() {
                window.console.warn("conn close");
                this.is_disabled = true;
            },
            ws_send() {

                this.socket.send(JSON.stringify({
                    message: this.send_message
                }));
                this.return_messages.push(">>>" + this.send_message);
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
  .shell{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div:first-child{
      width: 800px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .input{
        width: 710px;
      }
    }
    div:last-child {
      height: 800px;
      width: 800px;
      margin-top: 10px;
      overflow: auto;
      background-color: #333333;
      color: #f7f7f7;
      font-size: 14px;
    }
  }

</style>