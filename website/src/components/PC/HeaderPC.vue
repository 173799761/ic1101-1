<template>
  <header class="header">
    <nav class="navbar navbar-expand-md fixed-top top_nav">
      <div class="container-fluid" style="margin: 0 40px;">
        <a
          href="/#/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img src="@/assets/images/ic-logo.png" width="225" height="56" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="nav nav-pills header_nav">
            <li
              class="nav-item"
              :class="item.clicked ? 'clicked' : ''"
              v-for="(item, index) in headerList"
            >
              <router-link :to="{ name: item.name }" :key="index">
                <span class="nav-link">{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
          <div class="icon_box" style="margin-left: 20px">
            <a href="https://twitter.com/IC1101World">
              <img src="@/assets/images/twitter.png" width="34" height="34" />
            </a>
            <a href="https://discord.gg/ic1101world" style="margin-left: 20px">
              <img src="@/assets/images/discord.png" width="34" height="34" />
            </a>
          </div>

          <div class="account" @click="onClickWalletConnect">
            <img src="@/assets/images/icon_account.png" />
          </div>
        </div>
      </div>
    </nav>
    <el-drawer
      v-model="drawer"
      title=""
      :before-close="handleClose"
      :size="'403px'"
      :show-close="false"
    >
      <div class="d-flex flex-column">
        <!-- <div class="other-div" @click="onChickAccount">
          <div class="other-img">
            <img src="@/assets/images/account/icon_assets.png" />
          </div>
          <div class="other-txt">
            <p>Account</p>
          </div>
        </div> -->
        <div class="other-div" @click="onChickLogout">
          <div class="other-img">
            <img src="@/assets/images/account/icon_logout.png" />
          </div>
          <div class="other-txt">
            <p>Logout</p>
            <!-- <p>Logout your account</p> -->
          </div>
        </div>
      </div>
    </el-drawer>
    <WalletConnect :display="showDialog"></WalletConnect>
  </header>
  <div class="pop-loading" v-if="showLoading">
    <img src="@/assets/images/loading.png" width="144" height="144" />
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
  onUpdated,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import WalletConnect from "./WalletConnect.vue";

const eventHub = inject("$eventHub");

const store = useStore();
const router = useRouter();
const drawer = ref(false);

let showDialog = ref(false);
let showLoading = ref(false);

let headerList = reactive([
  { id: "1", name: "Home", title: "Home", clicked: true },
  { id: "2", name: "Activity", title: "Activity", clicked: false },
]);

const handleClose = () => {
  drawer.value = false;
  eventHub.$emit("drawerClose");
};

const onClickWalletConnect = async () => {
  if (store.state.hasLogin == "true") {
    drawer.value = true;
  } else {
    showDialog.value = true;
  }
};

const onChickAccount = () => {
  router.push("./account");
  drawer.value = false;
};


const onChickLogout = () => {
  drawer.value = false;
  eventHub.$emit("home:logout");
  store.commit("logout");
  router.push("./");
};

onBeforeMount(() => {
  eventHub.$on("update:display", (bool) => {
    showDialog.value = bool;
  });
  eventHub.$on("showLoading", (bool) => {
    showLoading.value = bool;
  });
  // 监听  $emit触发后在此处接收传过来的参数
  eventHub.$on("tabNav", (data) => {
    let _data = data;
    for (let i of headerList) {
      if (i.name == _data.name) {
        i.clicked = true;
      } else {
        i.clicked = false;
      }
    }
  });
});

onBeforeUnmount(() => {});
onUpdated(() => {
  // hasLogin.value = store.state.hasLogin == "true" ? true : false;
});
</script>

<style lang="less" scoped>
.navbar-collapse {
  flex-grow: 0;
}

.header {
  position: relative;
  widows: 100vw;
}
.top_nav {
  // position: fixed;
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.26) 100%);
}

.header_nav span {
  color: #fff;
}

.header_nav .clicked span,
.header_nav span:hover {
  color: #0cacff;
}

.header_nav /deep/ a {
  text-decoration: none;
}

.account {
  margin-left: 20px;
  cursor: pointer;
}

.header /deep/ .el-overlay {
  top: 70px;
}
.header /deep/ .el-drawer {
  background-color: #000;
  height: 830px;
  width: 403px;
}

.pop-loading {
  top: 0;
  left: 0;
  z-index: 9999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.56);
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
      -ms-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }

  img {
    animation: spin 3s linear infinite;
  }
}

.other-div {
  width: 320px;
  height: 202px;
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .other-txt {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p:nth-of-type(1) {
      font-size: 25px;
      color: #fff;
    }
    p:nth-of-type(2) {
      margin-top: 4px;
      font-size: 13px;
      color: #707070;
      text-align: center;
    }
  }
}
</style>
