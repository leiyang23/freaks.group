<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" :style="{height: pageHeight + 'px'}">        

        <el-row class="aside">
          <User @goto="change"/>

          <el-row class="nav">
            <el-col :span="24">
              <el-menu class="menu-aside"
                        ref="el_menu"
                       :router="true"
                       default-active="1"
                       background-color="#3c444d"
                       text-color="#bbb"
                       active-text-color="#ffffff"
              >
                <el-menu-item-group>
                  <template slot="title"><i class="fa fa-television"></i> <span
                          style="font-size: 14px;margin-left: 2px">运维</span></template>
                  <el-menu-item index="1" route="/monitor/hosts">主机性能</el-menu-item>
                  <el-menu-item index="2" route="/monitor/terminal">远程 Shell</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title"><i class="fa fa-wrench"></i> <span
                          style="font-size: 14px;margin-left: 2px">工具</span></template>

                  <el-menu-item index="3" route="/apps/imgur">图片托管</el-menu-item>
                  <el-menu-item index="4" route="/apps/musicVisualization">Music 频谱</el-menu-item>
                  <el-menu-item index="5" route="/apps/ocr">文字识别</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title"><i class="fa fa-comment"></i> <span
                          style="font-size: 14px;margin-left: 2px">关于</span></template>
                <el-menu-item index="6" route="/apps/about/me">关于我</el-menu-item>
                  <el-menu-item index="7" route="/apps/about/site">关于本站</el-menu-item>
                </el-menu-item-group>
              </el-menu>
            </el-col>
          </el-row>

          <el-row class="music">
            <MusicBox/>
          </el-row>
          <el-row class="beian">
            <a href="http://www.beian.miit.gov.cn" target="_blank">豫ICP备18007474号</a>
          </el-row>

        </el-row>
      </el-aside>

      <el-main :style="{height: pageHeight + 'px'}" class="main">  <router-view/>   </el-main>
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
        methods:{
          change(){
            this.$refs.el_menu.activeIndex = "0"
          }
        }
    }
</script>

<style scoped lang="less">
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
            font-size: 16px;
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
  .beian{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;

    a {
      text-decoration: none;
      color: #a3a3a3;
    }
    /*正常的未被访问过的链接*/
    a:link {
      text-decoration: none;
    }
    /*已经访问过的链接*/
    a:visited {
      text-decoration: none;
    }
    /*鼠标划过(停留)的链接*/
    a:hover {
      text-decoration: none;
    }
    /* 正在点击的链接*/
    a:active {
      text-decoration: none;
    }
  }
</style>
