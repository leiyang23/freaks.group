<template>
  <div>
    <h1>主机监控</h1>
    <div class="os-info">
      <router-link to="/monitor/terminal">
        <el-tag type="success" >操作系统：{{return_messages.os.system}}</el-tag>
      </router-link>
      <el-tag>版本：{{return_messages.os.version}}</el-tag>
      <span class="work-time">运行时长：{{return_messages.work_time.days}} 天 {{return_messages.work_time.hours}} 小时 {{return_messages.work_time.minutes}} 分钟</span>
    </div>

    <div class="monitors">
      <div class="monitor-item">
        <div class="title">负载状态</div>
        <el-progress type="circle" :percentage="return_messages.load.mins_5"
                     :color="return_messages.load.mins_5>50?'red':''"></el-progress>
        <div class="footer">{{return_messages.load.mins_1/return_messages.cpu.cores >5?"超负荷":"运行流畅"}}</div>
      </div>
      <div class="monitor-item">
        <div class="title">CPU 使用率</div>
        <el-progress type="circle" :percentage="return_messages.cpu.load"
                     :color="return_messages.cpu.load>50?'red':''"></el-progress>
        <div class="footer">{{return_messages.cpu.cores}} 核心</div>
      </div>
      <div class="monitor-item">
        <div class="title">内存使用率</div>
        <el-progress type="circle" :percentage="return_messages.memory.percent"
                     :color="return_messages.memory.percent>50?'red':''"></el-progress>
        <div class="footer">{{return_messages.memory.used | Bytes2MB }} / {{return_messages.memory.total |
          Bytes2MB}} (MB)
        </div>
      </div>
      <div class="monitor-item">
        <div class="title"> /</div>
        <el-progress type="circle" :percentage="return_messages.disk.percent"
                     :color="return_messages.disk.percent>50?'red':''"></el-progress>
        <div class="footer">{{return_messages.disk.used | Bytes2GB}} / {{return_messages.disk.total | Bytes2GB}} (GB)
        </div>
      </div>
    </div>

    <div id=""></div>

  </div>
</template>

<script>
    import {WS_BASE_URL} from '../../conf'

    export default {
        name: "Hosts",
        data() {
            return {
                socket: "",
                ws_path: WS_BASE_URL + '/ws/monitor/get_host_info',

                return_messages: {
                    'os': {'system': '', 'version': ''},
                    'work_time': {'days': 0, 'hours': 0, 'minutes': 0},
                    'cpu': {'cores': 0, 'load': 0.0},
                    'memory': {'total': 0, 'used': 0, 'available': 3344367616, 'percent': 0},
                    'disk': {'total': 0, 'used': 0, 'percent': 0},
                    'load': {'mins_1': 0.0, 'mins_5': 0.0, 'mins_15': 0.0},
                    'conn': 278
                },
                send_message: ''
            }
        },
        filters: {
            /**
             * @return {number}
             */
            Bytes2GB(val) {
                return Math.floor(val / 1024 / 1024 / 1024)
            },
            /**
             * @return {number}
             */
            Bytes2MB(val) {
                return Math.floor(val / 1024 / 1024)
            }
        },
        mounted() {
            this.init()
        },
        methods: {
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
                this.ws_send();
                window.console.log("conn success");
            },
            ws_error() {
                window.console.log("conn err");
                this.$message.error("websocket 连接出错！")
            },
            ws_get_message(msg) {
                // window.console.log(msg);
                this.return_messages = JSON.parse(msg.data).message;
            },
            ws_close() {
                window.console.warn("conn close");
                clearInterval(this.timer)
            },
            ws_send() {
                // 每隔 5 秒向后台发送一次数据，这样后台才会返回数据
                let that = this;
                that.socket.send(JSON.stringify({
                    message: 1
                }));
                that.timer = setInterval(function () {
                    that.socket.send(JSON.stringify({
                        message: 1
                    }))
                },3000)

            }
        },
        destroyed() {
            clearInterval(this.timer)
            this.socket.close();
        }
    }
</script>

<style scoped lang="less">
  .monitors {
    display: flex;
    flex-direction: row;
    font-size: 12px;


    .monitor-item {
      margin-right: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        height: 40px;
        line-height: 40px;
      }

      .footer {
        height: 40px;
        line-height: 40px;
        color: #aaaaaa;
      }

    }
  }

  .os-info {
    span {
      margin-right: 20px;
    }

    .work-time {
      color: #aaa;
      font-size: 12px;
      margin-left: 60px;
    }
  }
</style>