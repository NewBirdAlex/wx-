import axios from 'axios'

import Vue from 'vue'

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config){
    // 处理请求之前的配置
  //config.data.token=store.state.userMessage.token;
  //config.data.userId=store.state.userMessage.userId;

    return config;
}, function (error){
    // 请求失败的处理
    return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response){
    // 处理响应数据


    return response;
}, function (error){
    // 处理响应失败

    return Promise.reject(error);
});

// axios.defaults.baseURL = vue.config.path;0
// axios.defaults.baseURL = 'http://192.168.0.114:8888';
// axios.defaults.baseURL = 'http://192.168.0.114:8888';
axios.defaults.baseURL = 'https://app.vshi5.com/courseApi';//test
// axios.defaults.baseURL = 'http://192.168.0.102:8888';//test
// axios.defaults.baseURL = 'https://jfb.vshi5.com/jfbApi';//正式

export default axios
