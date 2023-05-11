<template>
  <div id="app">
    <!-- <HeaderPC></HeaderPC> -->
    <router-view />
    <!-- <FooterPC></FooterPC> -->
  </div>
</template>

<script setup>
import HeaderPC from "@/components/PC/HeaderPC.vue";
import FooterPC from "@/components/PC/FootPC.vue";
import { ref, onBeforeMount, inject } from "vue";
import { connectWallet } from "./utils/web3/connectWallet";
const ethereum = inject("$ethereum");
let isMobile = ref(false);
const isMobileFunc = () => {
  isMobile.value = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
};

onBeforeMount(() => {
  // isMobileFunc();
  window.ue.interface.connect_wallet = ethereum.connect;

  // 检测一下wallet是否被连接着，如果连接着就断开
  let imp = new connectWallet();
  imp.initProvider();
  if (imp.provider.connector.connected) {
    imp.killWalletConnect();
  }
});
</script>

<style lang="less" scoped>
#app {
  color: #fff;
}
</style>
