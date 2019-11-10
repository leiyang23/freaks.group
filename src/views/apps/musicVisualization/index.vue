<template>
  <div>
    <div class="wrapper" style="width: 100%">
      <canvas class="visualizer" width="1000" height="600"></canvas>
    </div>


    <div class="music-list">
      <el-tag @click="next" type="success" class="music-item">随机播放</el-tag>
      <el-tag v-for="(music,index) in musics" :key="index" @click="src=music.url" class="music-item">{{music.name}}
      </el-tag>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                audioCtx: null,
                analyser: null,
                distortion: null,
                source: null,
                drawVisual: null,
                AudioBufferSourceNode: null,
                musics: [
                    {
                        name: "我的地盘",
                        url: "http://static.freaks.group/musicVisualization/01.%E6%88%91%E7%9A%84%E5%9C%B0%E7%9B%98.mp3"
                    },
                    {
                        name: "牛仔很忙",
                        url: "http://static.freaks.group/musicVisualization/01.%E7%89%9B%E4%BB%94%E5%BE%88%E5%BF%99.mp3"
                    },
                    {
                        name: "彩虹",
                        url: "http://static.freaks.group/musicVisualization/02.%E5%BD%A9%E8%99%B9.mp3"
                    },
                    {
                        name: "青花瓷",
                        url: "http://static.freaks.group/musicVisualization/03.%E9%9D%92%E8%8A%B1%E7%93%B7.mp3"
                    },
                    {
                        name: "夜曲",
                        url: "http://static.freaks.group/musicVisualization/0801.%E5%A4%9C%E6%9B%B2.mp3"
                    },
                    {
                        name: "发如雪",
                        url: "http://static.freaks.group/musicVisualization/0803.%E5%8F%91%E5%A6%82%E9%9B%AA.mp3"
                    },
                    {
                        name: "黑色毛衣",
                        url: "http://static.freaks.group/musicVisualization/0804.%E9%BB%91%E8%89%B2%E6%AF%9B%E8%A1%A3.mp3"
                    },
                    {
                        name: "甜甜的",
                        url: "http://static.freaks.group/musicVisualization/09.%E7%94%9C%E7%94%9C%E7%9A%84.mp3"
                    },
                    {
                        name: "双截棍",
                        url: "http://static.freaks.group/musicVisualization/09%20%E5%8F%8C%E6%88%AA%E6%A3%8D.mp3"
                    },
                    {
                        name: "不能说的秘密",
                        url: "http://static.freaks.group/musicVisualization/1225.%E4%B8%8D%E8%83%BD%E8%AF%B4%E7%9A%84%E7%A7%98%E5%AF%86.mp3"
                    },
                    {
                        name: "给我一首歌的时间",
                        url: "http://static.freaks.group/musicVisualization/1402.%E7%BB%99%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%97%B6%E9%97%B4.mp3"
                    },

                    {
                        name: "说好的幸福呢",
                        url: "http://static.freaks.group/musicVisualization/1406.%E8%AF%B4%E5%A5%BD%E7%9A%84%E5%B9%B8%E7%A6%8F%E5%91%A2.mp3"
                    },
                    {
                        name: "稻香",
                        url: "http://static.freaks.group/musicVisualization/1411.%E7%A8%BB%E9%A6%99.mp3"
                    },
                    {
                        name: "龙拳",
                        url: "http://static.freaks.group/musicVisualization/%E5%91%A8%E6%9D%B0%E4%BC%A6%20-%20%E9%BE%99%E6%8B%B3.mp3"
                    },
                    {
                        name: "星晴",
                        url: "http://static.freaks.group/musicVisualization/%E5%91%A8%E6%9D%B0%E5%80%AB%20-%20%E6%98%9F%E6%99%B4.mp3"
                    },
                    {
                        name: "龙卷风",
                        url: "http://static.freaks.group/musicVisualization/%E5%91%A8%E6%9D%B0%E5%80%AB%20-%20%E9%BE%99%E5%8D%B7%E9%A3%8E.mp3"
                    },
                    {
                        name: "挥挥手",
                        url: "http://static.freaks.group/musicVisualization/%E6%8C%A5%E6%8C%A5%E6%89%8B.mp3"
                    },
                    {
                        name: "私奔",
                        url: "http://static.freaks.group/musicVisualization/%E7%A7%81%E5%A5%94%20%E6%A2%81%E5%8D%9A.mp3"
                    },
                    {
                        name: "老同学",
                        url: "http://static.freaks.group/musicVisualization/%E8%80%81%E5%90%8C%E5%AD%A6.mp3"
                    },
                    {
                        name: "需要人陪",
                        url: "http://static.freaks.group/musicVisualization/%E9%9C%80%E8%A6%81%E4%BA%BA%E9%99%AA.mp3"
                    },
                ],
                src: "http://static.freaks.group/musicVisualization/1411.%E7%A8%BB%E9%A6%99.mp3"

            }
        },

        watch: {
            src: function (val) {
                this.voiceChange(val)
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            next() {
                this.src = this.musics[Math.floor(Math.random() * this.musics.length)].url
            },
            init() {
                let that = this;
                // 创建画布，用来绘制曲线
                this.canvas = document.querySelector('.visualizer');
                this.canvas.width = document.querySelector(".wrapper").clientWidth;
                this.canvasCtx = this.canvas.getContext("2d");

                that.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                that.analyser = that.audioCtx.createAnalyser();

                // 申请权限
                // navigator.mediaDevices.getUserMedia({audio: true})
                //     .then(function () {
                //         // 初始化 音频上下文对象
                //         that.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                //         that.analyser = that.audioCtx.createAnalyser();
                //
                //         // that.getDataFromAjax(that.url)
                //     })
                //     .catch(function (err) {
                //         window.console.error(err)
                //     })

            },
            voiceChange(url) {
                if (this.AudioBufferSourceNode) {
                    this.AudioBufferSourceNode.stop();
                }

                this.getDataFromAjax(url);

            },
            getDataFromAjax(url) {
                // 从 Ajax 获取数据
                let that = this;
                let request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.responseType = 'arraybuffer'; // 设置数据类型为arraybuffer

                request.onload = function () {
                    let audioData = request.response;
                    that.audioCtx.decodeAudioData(audioData, function (buffer) {
                            // 将 array buffer -> audio buffer
                            that.AudioBufferSourceNode = that.audioCtx.createBufferSource(); // 创建 AudioBufferSourceNode 对象，即是音频源
                            that.AudioBufferSourceNode.buffer = buffer;  // 把 数据 传给 音频源

                            that.AudioBufferSourceNode.connect(that.analyser); // 把 音频数据连接到 分析器，开始播放时就可以从分析器获取数据
                            that.AudioBufferSourceNode.connect(that.audioCtx.destination); // 把声音连接到输出设备，这样开始播放是我们才能听到声音

                            that.AudioBufferSourceNode.start(); // 开始播放
                            that.visualize() // 可视化
                        },
                        function (e) {
                            window.console.log("Error with decoding audio data", e)
                        });
                };

                request.send();
            },
            getDataFromFile() {

            },

            visualize() {
                let that = this;
                let WIDTH = that.canvas.width;
                let HEIGHT = that.canvas.height;
                this.analyser.fftSize = 2048;
                let bufferLength = this.analyser.fftSize;
                let dataArray = new Uint8Array(bufferLength);

                this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                let draw = function () {
                    that.drawVisual = requestAnimationFrame(draw);

                    that.analyser.getByteTimeDomainData(dataArray);
                    // window.console.error(dataArray)

                    that.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                    that.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                    that.canvasCtx.lineWidth = 2;
                    that.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
                    that.canvasCtx.beginPath();
                    let sliceWidth = WIDTH * 1.0 / bufferLength;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        let v = dataArray[i] / 128.0;
                        let y = v * HEIGHT / 2;

                        if (i === 0) {
                            that.canvasCtx.moveTo(x, y);
                        } else {
                            that.canvasCtx.lineTo(x, y);
                        }

                        x += sliceWidth;
                    }

                    that.canvasCtx.lineTo(that.canvas.width, that.canvas.height / 2);
                    that.canvasCtx.stroke();
                };

                draw();
            }
        },
        destroyed() {
            this.AudioBufferSourceNode.stop();
            this.audioCtx.close(); //关闭一个音频环境, 释放任何正在使用系统资源的音频.
        }
    }
</script>

<style scoped lang="less">
  .music-list {
    .music-item {
      cursor: pointer;
      margin-right: 10px;
    }
  }
</style>