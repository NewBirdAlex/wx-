<style scoped lang="less">
  @import "../assets/css/common.less";

  .middle{

  }
  .messageList{
    .overflow;
    margin:20px;
    border-radius: 5px;
    background: white;

    .content{
      .fl;
      font-size: 20px;
      .paddingTop;
      color:#46adf4;
      img{
        width: 200px;
      }
    }
  }
  .leftPart{
    color:white;
    >img{
      width: 90px;
      height: 90px;
      margin: 20px;
      border-radius: 50%;
      .fl;
    }
  }
  .msg{
    font-size: 40px;
    line-height: 70px;
    color: black;
  }
  .wrap{
    height: 100%;
    overflow: auto;
  }
  .top{
    color: white;
    font-size: 30px;
    padding: 20px;
    border-bottom: 1px solid #46adf4;
  }
</style>
<template>
    <div class="wrap">
      <div class="top">留言板</div>
      <transition-group
        name="custom-classes-transition"
        enter-active-class="animated bounceInRight"
        leave-active-class="animated bounceOutRight"
      >
        <div class="messageList animated bounceInRight" v-for="(item,index) in messageList" :key="index">
          <div class="fl leftPart">
            <img :src="item.head" alt="">

          </div>

          <div class="content"  >
            <p class="fs30">{{item.nick}}</p>
            <p class="paddingBottom msg">{{item.message}}</p>
            <!--<div>-->
            <!--<img src="../assets/img/bg.jpg" alt="">-->
            <!--</div>-->
          </div>
        </div>
      </transition-group>

    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
        data() {
            return {
              messageList:[]
            }
        },
        computed: {
          ...mapGetters([
            'courseId',
            'path',
          ])
        },
        created(){
          let that = this;
          var websocket = null;
          let path = this.path;

          //判断当前浏览器是否支持WebSocket
          if('WebSocket' in window){
            websocket = new WebSocket(path);
          }
          else{
            alert('Not support websocket')
          }

          //连接发生错误的回调方法
          websocket.onerror = function(){
            console.log("error");
          };

          //连接成功建立的回调方法
          websocket.onopen = function(event){
            console.log("open");
          }

          //接收到消息的回调方法
          websocket.onmessage = function(event){
            console.log(event.data);

            let data = event.data;
            let obj = JSON.parse(data);
            if(event.data&&obj.roomCourId==this.courseId){

              that.messageList.unshift(obj);
            }
          }

          //连接关闭的回调方法
          websocket.onclose = function(){
            console.log("close");
          }
        }
    }
</script>
