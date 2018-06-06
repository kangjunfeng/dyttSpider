<template>
    <div>
      <!-- 刷新按钮 -->
      <el-button class ="refreshBtn" icon="el-icon-refresh" type="primary" :loading="refreshing" circle @click="refreshAction"></el-button>
      <!-- 头部 -->
      <div class="homeHeader">
        <p class="headerTitle">KK的电影资源</p>
      </div>
      <!-- 标注 -->
      <div class="tip">
        <p class="tipTitle">温馨提示:点击下载前请安装或者打开迅雷</p>
      </div>
      <!-- 表格 -->
      <div class="tableContainer">
           <el-table
            :data="tableData"
            class="table"
            border
            :max-height="tableHeight"
            >
            <!-- 标题  -->
            <el-table-column label="标题" align="center" width="300">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span class="msgStyle">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <!-- 详情链接  -->
            <el-table-column label="详情链接" align="center" width="300">
              <template slot-scope="scope">
                <span class="msgStyle">{{ scope.row.href }}</span>
              </template>
            </el-table-column>
            <!-- 下载链接  -->
            <el-table-column label="下载链接" align="center" width="300">
              <template slot-scope="scope">
                <!-- <span  class="msgStyle"><input id='downloadUrl' :value="scope.row.download_url"/></span> -->
                <span  class="msgStyle"><p class='downloadUrl'>{{scope.row.urlArray[0]}}</p></span>
              </template>
            </el-table-column>
            <!-- 操作  -->
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button
                  class="downloadBtn"
                  size="mini"
                  type="danger"
                  @click="handleDownload(scope.$index, scope.row)">复制</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="movieAmount"
          :current-page="currentPage"
          :page-size = "pageSize"
          class="pagination"
          @current-change="pageClick"
          @prev-click ="pageClick"
          @next-click ="pageClick">
        </el-pagination>
      </div>
    </div>

</template>


<script>

  export default {
    data: ()=>({
      tableData: [],
      tableHeight: document.documentElement.clientHeight - 300,
      currentPage:0,
      pageSize:20,
      movieAmount:0,
      refreshing:false
    }),

    created () {

        this.getMovies(0,this.pageSize,res=>{
            this.tableData = this.tableData.concat(res);
        });

        this.getMovieAmount(res=>{
            this.movieAmount = res;
        })
    },

    methods: {
      //下载连接复制
      handleDownload(index, row) {
          var val = document.getElementsByClassName('downloadUrl');
          window.getSelection().selectAllChildren(val[index]);
          document.execCommand('Copy','false',null);
     },

      //获取当前页电影数据
      getMovies (pageStart,pageSize,callback) {
        //node的端口可以自己配置,java我配置的是8085
        let url = 'http://localhost:8085/dytt/movies/getMovies'
        this.$ajax.post(url,{
                     pageStart:pageStart,
                     pageSize:pageSize,
                  }).then((res)=>{
                  console.log('getMovies res '+JSON.stringify(res));
                  var data = res.data;
                  if(data.status == 0){
                    callback(data.data);
                  }
              }).catch((res)=>{
                  console.log('catch '+res);
              });
      },

      //获取总页数
      getMovieAmount (callback) {
         let url = 'http://localhost:8085/dytt/movies/getMoviesAmount'
         this.$ajax.post(url).then((res)=>{
                  console.log('getMovieAmount res '+JSON.stringify(res));
                  var data = res.data;
                  if(data.status == 0){
                    callback(data.data);
                  }
              }).catch((res)=>{

              });
      },

      //分页点击
      pageClick (val){
        const currentPage = val - 1;
        this.currentPage = val;
        this.getMovies(currentPage,this.pageSize,res=>{
            this.tableData = this.tableData.concat(res);
        });
      },

      //重新爬取数据
      refreshAction () {
        this.refreshing = true;

        let url = 'http://localhost:3000/dytt/movies/crawlingMovies'
        this.$ajax.post(url).then((res=>{
             this.refreshing = false;
        }));
      },
    }
  }
</script>

<style scoped>

  .refreshBtn {
    position: absolute;
    top: 80px;
    right: 100px;
  }
  .headerTitle {
    width: 1000px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    color: #FFFFFF;
  }

  .homeHeader {
    width: 1000px;
    height: 100px;
    background: rgb(8, 197, 245);
    margin: 0 auto;
  }


  .tip {
    width: 1000px;
    height: 30px;
    margin-top: 50px;
    margin: 0 auto;
  }

  .tipTitle {
    width: 1000px;
    height: 30px;
    line-height:30px;
    font-size: 20px;
    color: #000000;
  }

  .tableContainer {
    width: 1000px;
    margin: 0 auto;
    margin-top: 30px;
  }

  .pagination {
    margin-top: 30px;
  }

  .msgStyle {
    text-align: left
  }
</style>

