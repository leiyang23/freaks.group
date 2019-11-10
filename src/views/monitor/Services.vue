<template>
    <div>
        <h1>服务监控</h1>
      <el-table border  :data="data" style="width: 500px">
        <el-table-column
                prop="name"
                label="域名"
                width="300">
        </el-table-column>
        <el-table-column  label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
                    :type="scope.row.ping_res[0] === '1' ? 'success' : 'error'"
                    disable-transitions>
              {{scope.row.ping_res[0] === '1' ? '正常' : '异常'}}
            </el-tag>
          </template>
        </el-table-column>

      </el-table>
    </div>
</template>

<script>
    export default {
        name: "Services",
        data() {
            return {
                data:[]
            }
        },
        mounted() {
            this.get_data()
        },
        methods: {
            get_data(){
                let that = this;
                that.$http({
                    url:"/monitor/site_monitor",
                }).then(res => {
                    if (res.data.status_code === 200){
                        that.data = res.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>