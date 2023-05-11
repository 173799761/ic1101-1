import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import routerM from './routerM';
import routerPC from './routerPC';

// import Home from '@/views/Home.vue'
// import IC1101 from '@/views/IC1101.vue'
// import Miner from '@/views/Miner.vue'
// import Redeem from '@/views/Redeem.vue'
// import NFT from '@/views/NFT.vue'
// import IWCoin from '@/views/IWCoin.vue'
// import Recruit from '@/views/Recruit.vue'
// import Profiles from '@/views/Profiles.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/ic1101',
//     name: 'IC1101',
//     component: IC1101
//   },
//   {
//     path: '/miner',
//     name: 'Miner',
//     component: Miner
//   },
//   {
//     path: '/NFT',
//     name: 'NFT',
//     component: NFT
//   },
//   {
//     path: '/redeem',
//     name: 'Redeem',
//     component: Redeem
//   },
//   {
//     path: '/IWCoin',
//     name: 'IWCoin',
//     component: IWCoin
//   },
//   {
//     path: '/recruit',
//     name: 'Recruit',
//     component: Recruit
//   },
//   {
//     path: '/profiles',
//     name: 'Profiles',
//     component: Profiles
//   },
// ]

const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHistory("/"),
  routes: routerPC//isMobile() ? routerM : routerPC
})

export default router
