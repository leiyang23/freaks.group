<template>
  <div id="spy">
    <el-row>
      <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="6" class="slid">
        <div style="color: #f7f7f7">hi</div>
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="12">
        <!-- 基本-系统 -->
        <div class="title">基本信息</div>
        <div class="block system">
          <el-tag>操作系统：{{base.uname.system}}</el-tag>
          <el-tag>系统版本：{{base.uname.version}}</el-tag>
          <el-tag>网络节点：{{base.uname.node}}</el-tag>
          <el-tag>处理器架构：{{base.uname.machine}}</el-tag>
          <el-tag>CPU 型号：{{base.cpu.model}}</el-tag>
          <el-tag>物理 CPU 数量：{{base.cpu.num}}</el-tag>
          <el-tag>工作时长：{{base.work_time.days}} 天 {{base.work_time.days}} 时 {{base.work_time.days}} 分</el-tag>
        </div>


        <!-- 基本-磁盘 -->
        <div class="title">磁盘用量</div>
        <div class="disk">
          <div class="block item" v-for="(disk,index) in base.disks" :key="index">
            <div style="color: #666; font-size: 12px; line-height: 30px;">
              {{disk.mount}}
            </div>
            <div>
              <el-progress type="circle" :percentage="disk.percent"
                           :color="disk.percent>60?disk.percent>80?'#F56C6C':'#E6A23C':''"></el-progress>
            </div>
            <div style="color: #666;font-size: 12px;line-height: 30px;">
              {{bytes_to_human(disk.used)}} / {{bytes_to_human(disk.total)}}
            </div>
          </div>
        </div>

        <!-- 实时-IO -->
        <div class="title">磁盘IO</div>
        <div class="io">
          <div id="disk" style="width: 100%; height: 400px;"></div>
        </div>

        <div class="title">网络IO</div>
        <div class="io">
          <div id="net" style="width: 100%; height: 400px;"></div>
        </div>

        <!-- 实时-负载  cpu百分比 内存-->
        <div class="title">CPU</div>
        <div class="cpu">
          <div id="cpu" style="width: 100%; height: 400px;"></div>
        </div>

        <!-- 实时-负载 内存-->
        <div class="title">负载</div>
        <div class="load">
          <div id="load" style="width: 50%; height: 400px; margin-right: 10px"></div>
          <div id="memory" style="width: 50%; height: 400px;"></div>
        </div>


      </el-col>
      <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="6" class="slid">
        <div style="color: #f7f7f7;">hi</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {WS_BASE_URL} from '../../conf'

    export default {
        name: "Hosts",
        data: function () {
            return {
                ws_path: WS_BASE_URL + '/ws/spy',

                base: null,
                realtime: null,
                myChartDiskIO: null,
                myChartNetIO: null,

                disk_time: [],
                disk_series_data: [],
                net_time: [],
                net_series_data: [],
            }
        },
        mounted() {
            let that = this;
            this.getBase();
            this.dom_timer = setInterval(function () {
                if (document.getElementById('memory')) {
                    window.console.log(document.getElementById('memory'));
                    // 建立ws
                    that.myChartDiskIO = that.$echarts.init(document.getElementById('disk'));
                    that.myChartNetIO = that.$echarts.init(document.getElementById('net'));
                    that.myChartCpu = that.$echarts.init(document.getElementById('cpu'));
                    that.myChartLoad = that.$echarts.init(document.getElementById('load'));
                    that.myChartMemory = that.$echarts.init(document.getElementById('memory'));
                    that.init_ws();
                    window.clearInterval(that.dom_timer);
                }

            }, 100)


        },
        methods: {
            getBase() {
                let that = this;
                that.$http({
                    url: '/spy/api/base'
                }).then(function (response) {
                    // window.console.log(response.data.data);
                    if (response.data.errcode == 0) {
                        that.base = response.data.data
                    }
                })
                    .catch(function (error) {
                        window.console.log(error);
                    });
            },
            init_ws() {
                let that = this;
                // 创建websocket连接
                this.websock = new WebSocket(that.ws_path);
                // 监听打开
                this.websock.onopen = this.websockOpen;
                // 监听关闭
                this.websock.onclose = this.websockClose;
                //监听异常
                this.websock.onerror = this.websockError;
                //监听服务器发送的消息
                this.websock.onmessage = this.websockMessage;
            },
            websockOpen() {
                window.console.log("build ws connection...");
                let that = this;
                this.timer = setInterval(function () {
                    that.websock.send(JSON.stringify({
                        "message": "heart"
                    }))
                }, 3000);

            },
            websockClose() {
                window.console.log("ws connection close !");
                clearInterval(this.timer);
            },
            websockError() {
                window.console.error("ws connection error");
                clearInterval(this.timer);
            },
            websockMessage(e) {
                let data = JSON.parse(e.data);
                let that = this;
                window.console.log("receve message: ", data);

                that.draw_disk_io(data.time, data.disk_io);
                that.draw_net_io(data.time, data.net_io);
                that.draw_cpu(data.cpu_percent);
                that.draw_load(data.load);
                that.draw_memory(data.virtual_memory);
            },


            draw_disk_io(time, new_data) {
                let that = this;
                let k = {}
                const FLAG = ['-读', '-写']
                for (let key in new_data) {
                    for (var j = 0; j < new_data[key].length; j++) {
                        k[key + FLAG[j]] = new_data[key][j];
                    }
                }

                if (this.disk_time.length > 100) {
                    this.disk_time.shift();
                    this.disk_time.push(time);

                    for (let key in k) {
                        for (let i = 0; i < this.disk_series_data.length; i++) {
                            if (this.disk_series_data[i].name == key) {
                                this.disk_series_data[i].data.shift();
                                this.disk_series_data[i].data.push(k[key])
                            }
                        }
                    }

                } else {
                    this.disk_time.push(time);

                    if (this.disk_series_data.length == 0) {
                        for (let key in k) {
                            this.disk_series_data.push({
                                type: "line",
                                name: key,
                                areaStyle: {},
                                smooth: true,
                                showSymbol: false,
                                data: [k[key]]
                            })
                        }
                    } else {
                        for (let key in k) {
                            for (let i = 0; i < this.disk_series_data.length; i++) {
                                if (this.disk_series_data[i].name == key) {
                                    this.disk_series_data[i].data.push(k[key])
                                }
                            }
                        }
                    }
                }
                let opt = {
                    legend: {
                        show: true,
                        bottom: '0',
                        padding: [10, 5],
                        align: "left"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#e91e63'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: that.disk_time
                    },
                    yAxis: {
                        show: true,
                        name: "读写速率（bytes)",
                        type: 'value'
                    },
                    series: that.disk_series_data
                };
                that.myChartDiskIO.setOption(opt);

            },
            draw_net_io(time, new_data) {
                let k = {}
                const FLAG = ['发送', '接收', '发送包', '接收包']
                for (let key in new_data) {
                    for (var j = 0; j < new_data[key].length; j++) {
                        k[key + FLAG[j]] = new_data[key][j];
                    }
                }

                if (this.disk_time.length > 100) {
                    this.net_time.shift();
                    this.net_time.push(time);

                    for (let key in k) {
                        for (let i = 0; i < this.net_series_data.length; i++) {
                            if (this.net_series_data[i].name == key) {
                                this.net_series_data[i].data.shift();
                                this.net_series_data[i].data.push(k[key])
                            }
                        }
                    }

                } else {
                    this.net_time.push(time);

                    if (this.net_series_data.length == 0) {
                        for (let key in k) {
                            this.net_series_data.push({
                                type: "line",
                                name: key,
                                areaStyle: {},
                                smooth: true,
                                showSymbol: false,
                                data: [k[key]]
                            })
                        }
                    } else {
                        for (let key in k) {
                            for (let i = 0; i < this.net_series_data.length; i++) {
                                if (this.net_series_data[i].name == key) {
                                    this.net_series_data[i].data.push(k[key])
                                }
                            }
                        }
                    }
                }

                let opt = {
                    legend: {
                        show: true,
                        bottom: '0',
                        padding: [10, 5],
                        align: "left"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.disk_time
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: this.net_series_data
                }

                this.myChartNetIO.setOption(opt)
            },
            draw_cpu(new_data) {
                let cpus = []
                for (let i = 0; i < new_data.length; i++) {
                    cpus.push(i + 1)
                }
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'none',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        name: "逻辑cpu",
                        type: 'category',
                        data: cpus
                    },
                    yAxis: {
                        name: "使用率（%）",
                        type: 'value'
                    },
                    series: [{
                        data: new_data,
                        type: 'bar',
                    }]
                };
                this.myChartCpu.setOption(option)
            },
            draw_load(new_data) {
                let option = {
                    tooltip: {},
                    radar: {
                        shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            {name: '1分钟（%）', max: 100},
                            {name: '5分钟（%）', max: 100},
                            {name: '15分钟（%）', max: 100},

                        ]
                    },
                    series: [{
                        type: 'radar',
                        data: [
                            {
                                value: new_data,
                                name: '负载'
                            },

                        ]
                    }]
                };

                this.myChartLoad.setOption(option)
            },
            draw_memory(new_data) {
                let that = this;
                let option = {
                    tooltip: {
                        formatter: '总内存：' + that.bytes_to_human(new_data.total) + '<br/>' + '已使用：' + that.bytes_to_human(new_data.used)
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: '实时内存',
                            type: 'gauge',
                            detail: {formatter: '{value}%'},
                            data: [{value: new_data.percent, name: '内存使用率'}]
                        }
                    ]
                };
                this.myChartMemory.setOption(option)
            },
            bytes_to_human(bytes) {
                let kb = 1024
                let mb = kb * 1024
                let gb = mb * 1024
                if (bytes < 1024) {
                    return String(bytes) + ' B'
                }
                if (bytes >= 1024 && bytes < mb) {
                    return String(Math.floor(bytes * 10 / kb) / 10) + ' KB'
                }
                if (bytes >= mb && bytes < gb) {
                    return String(Math.floor(bytes * 10 / mb) / 10) + ' MB'
                }
                if (bytes >= gb) {
                    return String(Math.floor(bytes * 10 / gb) / 10) + ' GB'
                }

            }
        },
        destroyed() {
            window.clearInterval(this.timer)
        }

    }
</script>

<style scoped lang="less">

  .slid {
    /* background-color: #fff; */
  }

  .title {
    margin-top: 10px;
    line-height: 60px;
    font-size: 18px;
  }



  .system {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;

  }

  .disk {
    display: flex;
    flex-direction: row;
  }

  .disk .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    min-width: 150px;
    margin-right: 10px;
    width: 16%;
  }


  .load {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>