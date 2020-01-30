<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" :style="{height: pageHeight + 'px'}">        

        <el-row class="aside">
          <User/>

          <el-row class="nav">
            <el-col :span="24">
              <el-menu class="menu-aside"
                       :router="true"
                       default-active="1"
                       background-color="#3c444d"
                       text-color="#bbb"
                       active-text-color="#ffffff"
              >
                <el-menu-item-group>
                  <template slot="title"><i class="fa fa-television"></i> <span
                          style="font-size: 14px;margin-left: 2px">监控</span></template>
                  <el-menu-item index="1" route="/monitor/hosts">主机</el-menu-item>
                  <el-menu-item index="2" route="/monitor/terminal">shell</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title"><i class="fa fa-server"></i> <span
                          style="font-size: 14px;margin-left: 2px">应用</span></template>

                  <el-menu-item index="3" route="/apps/imgur">图床</el-menu-item>
                  <el-menu-item index="4" route="/apps/musicVisualization">频谱</el-menu-item>
                  <el-menu-item index="5" route="/apps/ocr">图像转文字</el-menu-item>
                </el-menu-item-group>
              </el-menu>
            </el-col>
          </el-row>

          <el-row class="music">
            <MusicBox/>
          </el-row>

        </el-row>

      </el-aside>
      <el-main :style="{height: pageHeight + 'px'}" class="main">
        <transition name="fade">
          <router-view/>
        </transition>
      </el-main>
    </el-container>    
  </div>
</template>
<script>
    import MusicBox from "./components/MusicBox";
    import User from "./components/User";

    export default {
        components: {MusicBox,User},
        data() {
            return {
                pageHeight: 0,
            }
        },
        mounted() {
            this.pageHeight = document.body.clientHeight;
            let that = this;
            window.addEventListener('resize', function () {
                that.pageHeight = document.body.clientHeight;
            });

        },
    }
</script>

<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: all .6s;
  }

  .fade-leave-active {
    position: absolute; /* 去除路由切换时抖动问题 */
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .el-aside {
    background-color: #3c444d;

    .aside {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .nav{
        flex-grow: 2;

        .menu-aside {
          border-right: none;

          .el-menu-item {
            font-size: 18px;
          }
        }
      }
    }
    .music{
      margin-bottom: 5px;
    }
  }
  .main{
    overflow: auto;
  }
</style>
