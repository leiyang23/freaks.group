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
                urls: ['http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98437/cf99d1afa34545e8a1b68151c3e2b609_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98438/11dfc869ce5248eb80966b84a0542863_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98439/942e6e21a6324f74a11fa39cc402dadd_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98444/ae0f1b97e71d4f83a5f11fa278d80e86_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98445/5942dea0d37e4f60a9f8b903047f7bd0_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98446/d2932effd4f04e999bd5740caa3fd6dc_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98447/ab6cca5dc991408aa396dddeedccffb7_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98460/7dfa3688b658488a87292d76e535d5d9_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video19/TMS/cc/33287/98467/faa82ceb212346d3ad0128c96706ee93_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98469/727a3f2bab49442dbf594ff8d42f6f91_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98470/25b3fb948ae642e4b3c1ca47262b2d5a_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98471/ef21072eb26e4ed5878a9f5191f4f4c7_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98472/90294e8eb0fe448e826ba7af3a8c22eb_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33287/98473/e677ebcd12e94d5cbf56c9388a638f99_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98474/0a0109d72db64e719e4a823e9d3af47f_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98475/6d1840a1e7fa41e0912b0d3c70af3584_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98477/c90f0ad6ed32481d8fa4d099e70ab1c9_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98478/6e71e39df5f3412683c9187c1dd159fa_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98479/78974f7164854af09d3e5b2be6f9e151_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98480/f2df28f211dc4a8a8277662cae2ef6fa_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98481/95c17228b8aa43efbd13981bf59e3c80_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98482/120820a0887e4aee8783d63135ca4999_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98483/9dbe07895cd941f4b6da6937070c9c52_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98484/1c4f39683140402b93eeaa65636cab60_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98486/affb94791d1d4dd1a4cb7a056ebe95f4_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98487/bf9f02348eab4f2a839fb3eeb1b41a5d_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98488/aa03d633daf04ac7a787771f994bdf38_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98489/2636e969a58640cf8074aae5317bc59f_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/98491/b400db3b2e594be5b3418637a6b2c2f1_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131496/505f4c9ac9254fe38a1bbeae9e3c1e17_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131497/0d4998e130f3456999ce5ccf097b600f_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131498/3e789a3b31c84c6d910435fe599075a8_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131499/792eaa65ad0d4faf8a58af96999a6d39_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131500/fef2e7df33af44f5b1b9fa715351078a_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33291/131501/cf44e886dcc24c2390a124927929271e_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98492/6439248622b34d369f3312b1ebfeaac7_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98493/e2a4127ad09c45acabd00f6ff3e9a741_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98494/06174b4d2e8b403f999ff972389bcdee_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98496/7aa936e697dd415f945e4030f081bd78_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98497/d7aeabd9e87e49d4933616c49aad8c5e_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98498/9bc8abf701ad4056b95565f75692d98c_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98499/0cc794bfc4fa402292a592aeac5a99e1_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98500/65b9d94729a749c7a8c6c2b80d5beace_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98502/8cadb8e43dec4a64890b9d61af5a9ee2_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98505/ce4ec1c5a1754af3b5165514ff32ecbd_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98506/0a30279ffd2c4f1b868ed3f12a7a2753_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98507/7b078b1d1e3c40e582dbca2facad5baf_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98508/b8fa13cf973043bcb61265f473411c47_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98510/810daa7ea17440f7a7870c07de69af14_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98511/9aa1d17140704bb4b3db075ecfa2a7e8_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98513/823dca0d51ba4ab5a792a83ff33f7024_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video18/TMS/cc/33292/98514/344c406138b740a8952f86e19ef955d8_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/113095/fec4154deffc4f3a8d64619b546364f5_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118689/08cdb34278d44914ac732ea952727695_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118690/67a2df3de1d84caaa83b9c836b20105d_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118691/6d8b1a23d725412a9ba3032bd036b67b_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118692/633c0b8218354eda989ee46c7dd0c06e_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118693/86aa4246ac5d47ba8dc2729ac2ae249c_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118694/8c175b4a019548f1891256d0d860446c_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118695/822df44cd50742239ac60de975d93b5b_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118696/347a1502da52411fa5a864a1d6638e12_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118697/803a76b517ff4a3189a3a8d672902301_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118698/9c02bd28202745219bc1351ca5c9d7e9_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118699/5972a204760a4a6c9a05d219c2e45543_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118700/15881626ed8a48fdb9e4cbb1dedb7ff8_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118701/a4354b7019a74bd8a34e3f4ad2641c1c_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118702/4ffcbc83b9a6414d9f37861a04fef2b4_MP3_192.mp3', 'http://vod.cntv.lxdns.com/flash/mp4video28/TMS/cc/36294/118703/2f34e9a75fc74b2dbab40ed0d614a896_MP3_192.mp3'],
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
                this.sound = new Audio(this.urls[random_start]);
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
                this.sound.src = this.urls[this.cur_index];
                this.sound.play();
                this.is_play = true
            },
            last() {
                if (this.cur_index > 0) {
                    this.cur_index--
                } else {
                    this.cur_index = this.urls.length - 1
                }
                this.sound.src = this.urls[this.cur_index];
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