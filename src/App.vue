<template>
  <div id="app">
    <div class="top tac ">welcome everyone</div>
    <div class="middle">
      <div class="inner">
        <router-view/>

      </div>
    </div>
    <div class="bottom tac">
      <router-link tag="span" to="/"><i class="icon iconfont icon-qiandao"></i></router-link>
      <router-link tag="span" to="/message"><i class="icon iconfont icon-liuyan"></i></router-link>
      <router-link tag="span" to="/lottery"><i class="icon iconfont icon-liwu"></i></router-link>
      <router-link tag="span" to="/lotteryRec"><i class="icon iconfont icon-jilu"></i></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  computed: {

  },
  created(){

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
    let courseId = getQueryString("id");
    console.log(courseId)
    this.$store.commit('saveId',courseId);
  }
}
</script>

<style scoped lang="less">
  @import "assets/css/common.less";
  #app{
    height: 100vh;
    background: url("./assets/img/bg.jpg");
    background-size: 100% 100%;
    min-width: 1020px;
    /*filter: blur(3px);*/
  }
.top{
  height: 10vh;
  line-height: 10vh;
  color:white;
  font-size: 30px;
}
.middle{
  height: 80vh;
  color:#323232;
  //background: rgba(0,0,0,0.3);
  .inner{
    width: 80%;
    margin:0 auto;
    height: 100%;
    //background: rgba(0,0,0,0.3);

    background: rgba(255,255,255,.1);
  }
}
.bottom{
  height: 10vh;
  /*background: rgba(255,255,255,.3);*/
  position: fixed;
  bottom: 0;
  width: 100%;
  .icon{
    font-size: 50px;
  }
  span{
    display: inline-block;
    color: white;
    font-size: 40px;
    //background: @blue;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
      &:hover{
       color:@blue;
        background: none;
    }
  }
}
</style>
