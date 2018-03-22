<style scoped lang="less">
  @import "../assets/css/common.less";
.top{
  color:white;
  font-size: 30px;
  padding:20px;
  border-bottom: 1px solid @blue;
}
  .wrap{
    height: 100%;
    overflow: auto;
  }
  .item{
    .fl;
    .tac;
    font-size: 18px;
    color:white;
    margin:20px 20px;
    img{
      width: 60px;
      height: 60px;

      border-radius: 50%;
    }
  }
</style>
<template>
    <div class="wrap">
      <div class="paddingAll top"> 签到墙 <span class="fr">共{{checkInList.length}}人签到</span></div>
      <div class="overflow">

        <div class="item animated bounceInRight" v-for="(item,index) in checkInList" :key="index">
            <div><img :src="item.head" alt=""><p>{{item.nick}}</p></div>
        </div>
      </div>
    </div>
</template>

<script>
  let obj = '{"head":"https://wx.qlogo.cn/mmopen/vi_32/qrK8mWTBicV1Sbx2JnJE6Qcyezx2j4SwqogSfFypBybfg9BassY1MHrNl1RibU2tYQkBkmc2d4e0iazDmzIp1dPmA/132","nick":"lymit","senderId":4638,"startTimer":1521626027951,"message":"签到成功","type":"sign","roomCourId":41}'
  import { mapGetters } from 'vuex';

  export default {
        data() {
            return {
              checkInList:[]
            }
        },
        computed: {
          ...mapGetters([
            'courseId',
            'path',
          ])
        },
        beforeDestory(){

          //连接关闭的回调方法
          websocket.onclose = function(){
            console.log("close");
          }
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
            console.log(event.data)
            if(!event.data) return;

            let data = event.data;
            let obj = JSON.parse(data);
            if(obj&&obj.roomCourId==this.courseId&&obj.type=='sign'){
              that.checkInList.unshift(obj);
            }
          }

        }
    }
</script>
