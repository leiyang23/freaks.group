<template>
  <div class="con">
    <div class="music-box">
      <div><i class="fa fa-step-backward" @click="last"></i></div>
      <div v-if="is_play"><i class="fa fa-pause" @click="pause"></i></div>
      <div v-else><i class="fa fa-play" @click="play"></i></div>
      <div><i class="fa fa-step-forward" @click="next"></i></div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "MusicBox",
        data() {
            return {
                urls:[
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
                cur_index: 0,
                is_play: false,
                sound: null
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let that = this;
                let random_start = Math.floor(Math.random() * 12);
                this.cur_index = random_start;
                this.sound = new Audio(this.urls[random_start].url);
                this.sound.loop = false;
                setInterval(function () {
                    if (that.sound.ended) {
                        that.next()
                    }
                }, 1000)
            },
            pause() {
                this.sound.pause();
                this.is_play = false
            },
            play() {
                this.sound.play();
                this.is_play = true
            },
            next() {
                if (this.cur_index < this.urls.length) {
                    this.cur_index++;

                } else {
                    this.cur_index = 0
                }
                this.sound.src = this.urls[this.cur_index].url;
                this.sound.play();
                this.is_play = true
            },
            last() {
                if (this.cur_index > 0) {
                    this.cur_index--
                } else {
                    this.cur_index = this.urls.length - 1
                }
                this.sound.src = this.urls[this.cur_index].url;
                this.sound.play();
                this.is_play = true
            }
        }
    }
</script>

<style scoped lang="less">
  .con {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    .music-box {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      color: #42b983;
      height: 50px;
    }
  }

</style>