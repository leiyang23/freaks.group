<template>
<div>    
    <div v-if="login_status">
        <div class="custom-nav">
            <router-link to="/user/selfInfo">
                <div >个人主页</div>
            </router-link>
            <router-link to="/user/weatherTip">
                <div>天气提醒</div>
            </router-link>
        </div>

        <router-view name="user"/>
    </div>

    <div v-else style="display:flex;flex-direction:row;justify-content:center;align-items:center;height:400px">
    登录后才能查看本页内容！
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    computed:{
          login_status(){
            return this.$store.getters.get_login_status
          }
        },
    mounted(){
        
    },
}
</script>
<style lang="less" scoped>
.custom-nav{
    display: flex;
    flex-direction: row;
    div{
        margin-left: 10px;
    }
}
</style>