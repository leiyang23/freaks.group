<template>
  <div class="con">
    <div class="music-box">
      <el-button class="btn"  @click="open" cir size="small">设置</el-button>
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
                src:"",
                currentTime:0,
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
            next(){
                let that = this;
                let url = '';
                if(!that.playlist_id){
                     url="/assert/api/netease/random"
                }else{
                    url = "/assert/api/netease/random?playlist_id=" + that.playlist_id
                }
                that.$http({
                    baseURL: "http://freaks.group",
                    url: url
                }).then(res => {
                    window.console.log(res.data);
                    if(res.data.data == ""){
                        if(that.retry>5){
                            return
                        }
                        that.get_url();
                        that.retry += 1;
                    }else {
                        that.sound.src = res.data;
                        that.sound.play();
                        that.retry = 0;
                        this.is_play = true
                    }
                })
            },
            pause() {
                this.sound.pause();
                this.currentTime = this.sound.currentTime;
                this.is_play = false
            },
            play() {
                if(this.currentTime == 0){
                    this.next();
                }else{
                    this.sound.fastSeek(this.currentTime);
                    this.sound.play();
                }
                this.is_play = true
            },


            open() {
                let that = this;
                this.$prompt('请输入网易歌单ID', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\d{10}$/,
                    inputErrorMessage: 'ID格式不正确'
                }).then(({ value }) => {
                    that.playlist_id = value
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }

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
       .btn{
         visibility: hidden;
       }
      &:hover .btn{
        visibility: visible;
      }
    }
  }

</style>