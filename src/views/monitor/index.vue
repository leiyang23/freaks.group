<template>
    <div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: all .6s;
  }
  .fade-leave-active{
    position: absolute; /* 去除路由切换时抖动问题 */
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
    transform: translateY(30px);
  }
</style>