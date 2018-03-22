<style scoped lang="less">
  @import "../assets/css/common.less";
  .list{
    border-bottom: 2px solid darkgray;
    .paddingBottom;
    .left{
      width: 20%;}
      margin-right: 20px;
    .tac;
    color:white;
    font-size: 20px;

    line-height: 30px;
    .right{
      width: 70%;
      .fr;
      text-align: left;
      .item{
        .tac;

        display: inline-block;
        .marginRight;
        .marginBottom;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
<template>
    <div  style="height:100%; overflow: auto" class="paddingTop">
        <div class="list overflow" v-for="(item,index) in luckyList" :key="index">
           <div class="left fl">
             <div class="item">
               <img :src="item.prodPic" style="width: 200px" alt="">
               <p>{{item.prodName}}</p>
             </div>
           </div>
           <div class="right" v-if="luckyList.length">
             <div class="item" v-for="(person,index2) in item.list" :key="index2">
               <img :src="person.userAvatar" alt="">
               <p>{{person.userName}}</p>
             </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              courseId:'',
              luckyList:[]
            }
        },
        methods:{
          getCourseId(){
            function getQueryString(name) {
              var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
              var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
              var r = window.location.search.substr(1).match(reg);
              var q = window.location.pathname.substr(1).match(reg_rewrite);
              if(r != null){
                return unescape(r[2]);
              }else if(q != null){
                return unescape(q[2]);
              }else{
                return null;
              }
            }
            this.courseId = getQueryString("id");

          },
          getList(){
            this.$http.post('/wxProd/getListByWeb',{
              "courseId": this.courseId,
              "pageNumber": 1,
              "pageSize": 1000
            })
              .then(res=>{
                this.luckyList = res.data.data.content;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        created(){
          this.getCourseId();
          this.getList();
        }
    }
</script>
