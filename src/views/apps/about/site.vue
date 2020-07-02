<template>
  <div class="page">
    <div class="article">
      <p>
        写一个属于自己的网站一直是我的执念，这代表了在互联网上的一个小窝，没有什么比自己亲手搭建更有成就感了。自己的小窝嘛，可以随意折腾，
        想怎么改就怎么改，自由😎。
      </p>
      <p>
        整个网站目前没有一个我满意的功能，都是半成品，后期会慢慢优化、添加。
      </p>
      <p>
        其实我最开始时想做的是 <a href="http://www.wufazhuce.com/" target="_blank">ONE</a> 和
        <a href="https://www.luoow.com/" target="_blank">落网</a> 这样，这两个网站就是我理想中的样子，真的赞。
      </p>

      <h2>其他项目</h2>
      <h5>听歌小程序</h5>
      <p>
        后端是用 Golang 写的，使用时需要5秒内连击10次屏幕才能进入真正的界面，没办法，需要应付腾讯的审查😛：
      </p>
      <img width="200px" height="200px"
           src="http://qiniu1.freaks.group/%E4%BB%93%E9%BC%A0fly-%E5%B0%8F%E7%A8%8B%E5%BA%8F.jpg" alt="小程序">

      <h5>资源站（构想阶段）</h5>
      <p>打造一个属于自己的资源存储空间😁。</p>
      <p>
        1. 利用api动态修改域名映射的IP地址，可以将已备案域名一直映射到家里的主机地址，这部分容易实现。<br>
        2. 使用 Golang 模仿七牛云的对象存储功能写一套资源管理程序。这部分仍然在构想阶段...
      </p>
      <p>
        完成以后，在写其他小应用时，资源可以随时存取，巨方便。
      </p>
      <p>
        虽然折腾，但是家里的带宽闲着不也是闲着嘛，谁让咱穷呢🤷‍♂️。
      </p>

      <h5>仓库</h5>
      <a href="https://github.com/leiyang23" target="_blank"><i class="fa fa-github fa-3x" ></i></a>

    </div>
  </div>
</template>

<script>
    export default {
        name: "site",
        data() {
            return {}
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .article {
      width: 800px;
      font-size: 16px;
      color: #303133;
      line-height: 1.5em;
      text-align: justify;

    }
  }

</style>