<style scoped lang="less">
  @import "../assets/css/common.less";
  .wrap{
    height: 100%;
  }
  .left{
    width: calc(~"100% - 290px");
    .fl;
  }
  .right{
    width: 250px;
    padding: 20px;
    height: 100%;
    background: rgba(0,0,0,.4);
    .shop{
      border:1px solid white;
      text-indent: 1em;
      color:white;
      line-height: 50px;
      text-shadow: 0 0 2px #000;
      background-color: rgba(255,255,255,.1);
      border: 1px solid rgba(255,255,255,.3);
      cursor: pointer;
      border-radius: 3px;
      position: relative;
      .list{
        position: absolute;
        top:100%;
        width: 100%;
        li{
          background: #f2f2f2;
          color: #000;
          &:hover{
            background: #ccc;
            color:white;
          }
        }
      }
    }
    position: relative;
    .start{
      background: linear-gradient(#8c62a4, #6f4e8c);
      cursor: pointer;
      position: absolute;
      bottom: 60px;
      left: 5%;
      width: 85%;
      background: linear-gradient(#8c62a4, #6f4e8c);
      box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15);
      display: block;
      padding: 15px 10px;
      border-radius: 5px;
      color: #fff;
      font-size: 20px;
      text-shadow: 0 0 2px #000;
      text-align: center;
    }
  }
  .transpare{
    background-color: rgba(255,255,255,.1);
  }
  .number{
    line-height: 50px;
    color:white;
    font-size: 20px;
    .tac;
    margin: 20px 0;
    .icon{
      line-height: 50px;
      width: 50px;
      text-align: center;
      background: rgba(255,255,255,.3);
      cursor: pointer;
      font-size: 30px;

    }
  }
  .lotteryPeople{
    display: inline-block;
    .tac;
    color:white;
    font-size: 20px;
    .icon{
      font-size: 50px;
    }
    img{
      margin-bottom: 10px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
</style>
<template>
    <div class="overflow wrap">
      <div class="left tac">
        <div style="height: 150px"></div>
        <div v-if="!showResult">
          <div class="marginAll lotteryPeople"  v-for="(i,index) in prizeNumber" :key="">
            <div v-if="!defaultHead">
              <img v-if="personList[randomArr[index]].userAvatar" :src="personList[randomArr[index]].userAvatar||'../assets/img/bg.jpg'" alt="">
              <p>{{personList[randomArr[index]].userName}}</p>
            </div>
            <div v-else>
              <i class="icon iconfont icon-morentouxiang"></i>
              <p>....</p>
            </div>
          </div>
        </div>
        <div v-if="showResult">
          <div class="marginAll lotteryPeople"  v-for="(item,index) in luckyPerson" :key="">
            <img v-if="item.userAvatar" :src="item.userAvatar||'../assets/img/bg.jpg'" alt="">
            <p>{{item.userName}}</p>
          </div>
        </div>

      </div>
      <div class="right fr">
        <div class="shop" @click="showPrizes=!showPrizes  " v-if="prizeList">
          {{prizeList[prizeIndex].prodName}}
          <i class="icon iconfont icon-triangle-up fr marginRight"></i>
          <div class="list" v-if="showPrizes">
            <ul>
              <li v-for="(item,index) in prizeList" :key="index" @click="selectPrize(item,index)">{{item.prodName}}</li>
            </ul>
          </div>
        </div>
        <div class="number transpare">
          <i class="icon iconfont icon-jian fl" @click="count(0)"></i>
          <i class="icon iconfont icon-jia fr" @click="count(1)"></i>
          {{prizeNumber}}
        </div>
        <div class="present transpare marginTop paddingAll" v-if="prizeList">
          <img :src="prizeList[prizeIndex].prodPic" class="  w100" alt="">
        </div>

        <div class="start" @click="lottery"><span v-if="stopLottery">开始抽奖</span><span v-else="">停止抽奖</span></div>

      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              showPrizes:false,
              prizeNumber:1,
              courseId:null,
              prizeList:null,
              prizeIndex:0,
              personList:null,
              defaultHead:true,
              stopLottery:true,
              lotteryNumber:0,
              luckyPerson:null,
              randomArr:[],
              showResult:false
            }
        },
        methods:{
          resetData(){

          },
          getLuckyPerson(){
            this.$http.post('/wxWinrecord/stop', {
              "courseId": this.courseId,
              "prodId": this.prizeList[this.prizeIndex].id,
              "prodNum": this.prizeNumber
            })
              .then(res=>{
                this.luckyPerson = res.data.data;
                this.scroll();
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          lottery(){
            if(this.stopLottery){
              this.showResult = false;
              this.defaultHead = false;
              this.stopLottery = !this.stopLottery;
              this.getLuckyPerson();
            }else{
              this.stopLottery = !this.stopLottery;
            }

          },
          scroll(){
            let that = this;
            this.randomArr = [];
            for(let i = 0 ;i<this.prizeNumber;i++){
              this.randomArr.push(that.getRandom());
            }
            let timer = setTimeout(function () {

              if(that.stopLottery){
                that.showResult = true;
                clearTimeout(timer);
                return
              }
              that.scroll();
            },50)
          },
          getRandom(){
            let num = Math.floor(Math.random()*this.personList.length);
            return num
          },
          selectPrize(item,index){
            console.log(item)
            this.defaultHead=true;
            this.prizeIndex = index;
            this.showResult = false;

          },
          getAllPerson(){
            this.$http.post('/wxScansign/signUserList',{
              "courseId": this.courseId
            })
              .then(res=>{
                this.personList = res.data.data.userList;
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          getPrizeList(){
            this.$http.post('/wxProd/listJson',{
              "courseId": this.courseId
            })
              .then(res=>{
                this.prizeList = res.data.data;
              })
              .catch(function (error) {
                console.log(error);
              });
          },
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
          count(bol){
            if(bol){
              this.prizeNumber++;
              this.prizeNumber>this.personList.length?this.prizeNumber = this.personList.length:'';
            }else{
              this.prizeNumber--;
              this.prizeNumber<1?this.prizeNumber=1:'';
            }
            this.defaultHead=true;
            this.showResult = false;
          }
        },
      created(){
        this.getCourseId();
        this.getPrizeList();
        this.getAllPerson();
      }
    }
</script>
