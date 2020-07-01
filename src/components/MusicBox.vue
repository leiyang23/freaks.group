<template>
  <div class="con">
    <div class="music-box">
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
                playlist_id: undefined,
                is_play: false,
                sound: null,
                retry:0
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let that = this;
                this.sound = new Audio();
                this.sound.loop = false;
                setInterval(function () {
                    if (that.sound.ended) {
                        that.next()
                    }
                }, 1000)
            },
            get_url(){
                let that = this;
                that.$http({
                    baseURL: "http://freaks.group",
                    url:"/assert/api/netease/random" + that.playlist_id == undefined?"?playlist_id=" + that.playlist_id : "",
                }).then(res => {
                    window.console.log(res.data);
                    if(res.data.data == ""){
                        if(that.retry>5){
                            return
                        }
                        that.get_url();
                        that.retry += 1;
                    }else {
                        that.retry = 0
                    }
                })
            },
            pause() {
                this.sound.pause();
                this.is_play = false
            },
            play() {
                if(!this.sound.src){
                    this.sound.src = this.get_url();
                }
                this.sound.play();
                this.is_play = true
            },
            next() {
                this.sound.src = this.get_url();
                this.sound.play();
                this.is_play = true
            },

        },
        destroyed() {
            this.sound.clear()
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