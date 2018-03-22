import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);

const state = {
  showLoading:false,
  courseId:0,
  path:null
}

const mutations = {
  saveId(state,id){
    console.log(id)
    state.courseId = id;
    state.path = 'wss://app.vshi5.com/courseApi/websocket?courseId='+id;
  }

}

const actions = {
    saveId: ({commit})=>commit('saveId'),
}


const getters = {

  courseId:state => state.courseId,
  path:state => state.path,

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
