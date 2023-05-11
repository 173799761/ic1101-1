import { createStore } from "vuex";
const name = "ic1101-dapp";
export default createStore({
  state: {
    userInfo: {},
    hasLogin: window.sessionStorage.getItem(name + "hasLogin"),
    wallet: window.sessionStorage.getItem(name + "wallet"),

    step: 1,
    discordAuth: false,
    tokenData: {},
    invite: window.sessionStorage.getItem(name + "invite"),
  },
  getters: {},
  mutations: {
    login(state, data) {
      state.hasLogin = "true";
      window.sessionStorage.setItem(name + "hasLogin", state.hasLogin);
    },

    logout(state, data) {
      state.hasLogin = "false";
      window.sessionStorage.setItem(name + "hasLogin", state.hasLogin);
    },
    setUserInfo(state, data) {
      state.userInfo = data;
      window.sessionStorage.setItem(
        name + "userInfo",
        JSON.stringify(state.userInfo)
      );
    },
    getUserInfo(state) {
      let userInfoStr = window.sessionStorage.getItem(name + "userInfo");
      if (!userInfoStr) {
        state.userInfo = null;
      } else {
        state.userInfo = JSON.parse(userInfoStr);
      }
      return state.userInfo;
    },
    setWallet(state, data) {
      state.wallet = data;
      window.sessionStorage.setItem(name + "wallet", state.wallet);
    },
    setStep(state, data) {
      state.step = data;
    },
    setDiscordAuth(state, data) {
      state.discordAuth = data;
    },
    setTokenData(state, data) {
      state.tokenData = data;
    },
    setInvite(state, data){
      state.invite = data;
      window.sessionStorage.setItem(name + "invite", state.invite);
    }
  },
  actions: {},
  modules: {},
});

// 使用方法

// import { useStore } from "vuex";   //导入
// const store = useStore();          //声明store
// store.state.hasLogin;              //调用元素
// store.commit("logout");            //调用方法
