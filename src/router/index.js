import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CheckIn from '@/pages/CheckIn'
import Message from '@/pages/Message'
import Lottery from '@/pages/lottery'
import LotteryRec from '@/pages/lotteryRec'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: CheckIn
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: Lottery
    },
    {
      path: '/lotteryRec',
      name: 'lotteryRec',
      component: LotteryRec
    }
  ]
})
