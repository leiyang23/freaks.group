<template>
    <div class="page">
        <div class="text">
            <h1>天气提醒</h1>
            <p>待完成</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>

<style lang="less" scoped>
.page{
    height: 1080px;
    background-image: url("http://api.btstu.cn/sjbz/api.php?lx=dongman&format=images");
    object-fit: contain;
    .text{
        text-align: center;
        background-color: rgba(21 , 193, 73, .5);
        color: #fff
    }
}
</style>