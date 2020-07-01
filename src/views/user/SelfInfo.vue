<template>
  <div class="page">
    <div class="text">
      <h1>个人主页</h1>
      <p>该放些什么内容呢？</p>
    </div>

  </div>
</template>
<script>
    export default {
        data() {
            return {
                msg_num: 0,
                msgs: []
            }
        },
        mounted() {

        },
        methods: {


        }
    }
</script>
<style lang="less" scoped>
  .page {
    height: 1080px;
    background-image: url("http://api.btstu.cn/sjbz/api.php?lx=dongman&format=images");
    object-fit: contain;

    .text {
      text-align: center;
      background-color: rgba(21, 193, 73, .5);
      color: #fff
    }
  }
</style>