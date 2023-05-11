<template>
  <div class="home">
    <div class="d-flex align-items-end flex-column" style="width: 100vw; padding: 20px;">
      <div class="myButton" @click="onClickMetaMask">{{ MetamaskStr }}</div>
    </div>
    <div class="div">
      <div class="d-flex align-items-center flex-column justify-content-center" style="width: 100%;height: 100%;">
        <div class="d-flex align-items-center flex-column justify-content-center"
          style="margin-top: -100px; margin-left: -800px;">
          <div class="title">IC1101 Space X 3.0 Demo Day</div>
          <div class="d-flex align-items-center">
            <div>Countdown:</div>
            <div class="time">{{ countdown }}</div>
          </div>
          <div class="d-flex align-items-center">
            <div>start time:</div>
            <div style="margin-left: 20PX;">Jun.1st. 2023 UTC 02:00am</div>
          </div>
          <!-- <div class="myButton" style="margin-top: 40px;">Sign Up</div> -->
        </div>
      </div>
    </div>
    <div class="foot">© 2023 Abstracta Labs Pte. Ltd. All rights reserved.</div>
  </div>
</template>

<script setup>
import {
  onBeforeUnmount,
  reactive,
  ref,
  inject,
  onBeforeMount,
  onMounted,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const ethereum = inject("$ethereum");

const router = useRouter();
const store = useStore();

const api = inject("$api");
const utils = inject("$utils");

let targetDate = ref(1685584800000)

let MetamaskStr = ref('MetaMask')
let countdown = ref('00Days 00:00:00');

const updateCountdown = () => {
  const currentDate = new Date();
  const remainingTime = targetDate.value - currentDate.getTime();
  // 计算剩余天数、小时、分钟和秒数
  let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  if (days < 10) {
    days = "0" + days;
  }
  let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  countdown.value = `${days}Days ${hours}:${minutes}:${seconds}`;
}

let login = ref(false)
const onClickMetaMask = ()=>{
  if(!login.value){
    ethereum.connectMM(() => {
      let address = ethereum.getAccountAddress();
      let account = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      MetamaskStr.value = account;
      login.value = true;
    });
  }
}
let countdownInterval = null;
onBeforeMount(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});
onBeforeUnmount(() => { 
  if(countdownInterval){
    clearInterval(countdownInterval)
  }
});
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(@/assets/images/home/demoday.jpg) no-repeat center;

  .div {
    display: flex;
    width: 100%;
    height: 100%;

    .title {
      font-size: 50px;
    }

    .time {
      margin-left: 20px;
      font-size: 40px;
    }

  }

  .foot {
    position: absolute;
    bottom: 24px;
    font-size: 13px;
    color: #aaa;
  }
}

.myButton {
  width: 200px;
  height: 40px;
  background: url(@/assets/images/btn_1.png) no-repeat center;
  background-size: 200px 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  right: 0px;
}

.myButton:hover {
  background: url(@/assets/images/btn_2.png) no-repeat center;
  background-size: 200px 40px;
}

.dialog {
  .dialog-footer {
    display: flex;
    justify-content: center;
  }

  .marginleft {
    margin-left: 81px;
  }
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
