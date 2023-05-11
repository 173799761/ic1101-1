<template>
  <div class="dialog">
    <el-dialog
      v-model="display"
      title="Connect to a wallet"
      width="380px"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div class="wallet-box" @click="onClickMetaMask">
          MetaMask
          <img src="@/assets/images/metamask.svg" alt="" width="24" />
        </div>
        <div class="wallet-box" @click="onClickWalletConnect">
          WalletConnect
          <img src="@/assets/images/walletconnect.svg" alt="" width="24" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
  inject,
  onBeforeMount,
  toRefs,
} from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import md5 from "crypto-js/md5";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
const api = inject("$api");
const eventHub = inject("$eventHub");
const ethereum = inject("$ethereum");
const store = useStore();

let props = defineProps({
  display: {
    type: Boolean,
  },
});
let { display } = toRefs(props);

const handleClose = () => {
  eventHub.$emit("update:display", false);
};

const onClickMetaMask = () => {
  if(router.currentRoute.value.name == 'Home'){
    router.push('./Activity')
  }
  ethereum.connectMM(() => {
    let account = ethereum.getAccountAddress();
    let channelId = 2;
    let timestamp = new Date().getTime();
    let str = `account=${account}|channelId=${channelId}|loginType=${3}|timestamp=${timestamp}|ad78144c4e331a3e6bb811286247c3ec`;
    let sign = String(md5(str));
    let params = {
      channelId,
      account,
      pwd: "",
      sign,
      timestamp,
      loginType: 3,
    };
    api.loginByChannel(params).then((res) => {
      if (res.errCode === 0) {
        store.commit("setUserInfo", res.data);
        if(res.data.edit == false){
          eventHub.$emit("home:nextStep");
        }else{
          eventHub.$emit("home:login");
          store.commit("login");
          store.commit("setWallet", 'MetaMask');
        }
        eventHub.$emit("update:display", false);
      } else {
        ElMessage.error(res.errMsg);
      }
    });
  });
};
const onClickWalletConnect = () => {
  if(router.currentRoute.value.name == 'Home'){
    router.push('./Activity')
  }
  ethereum.connectWC(() => {
    let account = ethereum.getAccountAddress();
    let channelId = 2;
    let timestamp = new Date().getTime();
    let str = `account=${account}|channelId=${channelId}|loginType=${3}|timestamp=${timestamp}|ad78144c4e331a3e6bb811286247c3ec`;
    let sign = String(md5(str));
    let params = {
      channelId,
      account,
      pwd: "",
      sign,
      timestamp,
      loginType: 3,
    };
    api.loginByChannel(params).then((res) => {
      if (res.errCode === 0) {
        store.commit("setUserInfo", res.data);
        if (res.data.edit == false) {
          eventHub.$emit("home:nextStep");
        } else {
          eventHub.$emit("home:login");
          store.commit("login");
          store.commit("setWallet", "WalletConnect");
        }
        eventHub.$emit("update:display", false);
      } else {
        ElMessage.error(res.errMsg);
      }
    });
  });
};
</script>

<style lang="less" scoped>
.dialog-content {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.wallet-box {
  height: 39px;
  width: 222px;
  color: #f0b80b;
  background: url(@/assets/images/btn_1.png) no-repeat center;
  background-size: 222px 39px;
  padding: 0 24px;
  margin-bottom: 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.wallet-box:hover {
  background: url(@/assets/images/btn_2.png) no-repeat center;
  background-size: 222px 39px;
}

.dialog /deep/ .el-dialog {
  background: rgba(0, 0, 0, 0.76);
}

.dialog /deep/ .el-dialog__body {
  color: #fff;
}

.dialog /deep/ .el-dialog__title {
  color: #fff;
}
</style>
