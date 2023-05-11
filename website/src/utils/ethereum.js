import store from "@/store";
import { connectWallet } from "./web3/connectWallet";
import { metaMask } from "./web3/metaMask";
import { ElMessage } from "element-plus";
import eventHub from "./eventHub.js";

const ethereum = {
  imp: null, //上一次使用的那一个
  /**
   * 使用的哪个脚本
   */
  async initImp(cb) {
    if (store.state.wallet == "WalletConnect") {
      this.imp = new connectWallet();
      this.imp.initProvider();
    } else {
      this.imp = new metaMask();
    }
    await cb();
  },
  /**
   *
   */
  connectWC(cb) {
    this.imp = new connectWallet();
    this.imp.initProvider();
    this.imp.connect(cb);
  },
  /**
   * 连接小狐狸
   */
  connectMM(cb) {
    this.imp = new metaMask();
    this.imp.connect(cb);
  },

  /**
   * 连接
   * @param {*} cb
   */
  connect(cb) {
    this.initImp(() => {
      console.log("used: ", this.imp);
      this.imp.connect(cb);
    });
  },

  async judgeImp() {
    if (!this.imp) {
      this.connect(() => {
        ElMessage({
          message: "Connect Wallet Success, try again",
          type: "success",
        });
      });
    }
  },

  getAccountAddress() {
    return this.imp.accountAddress;
  },

  /**
   * 得到USDT数量
   * @returns
   */
  getUSDTBalance() {
    return this.imp.getUSDTBalance();
  },

  async curActiveType() {
    let type = 999;
    try {
      type = await this.imp.curActiveType();
      return type;
    } catch (error) {
      this.judgeImp();
    }
  },

  async getWhiteListByAddress(activeType) {
    let amount = 0;
    try {
      amount = await this.imp.getWhiteListByAddress(activeType);
      return amount;
    } catch (error) {
      this.judgeImp();
    }
  },

  /**
   * USDT 转账
   * @param {*} targetAddress
   * @param {*} amount
   */
  async transferUSDT(targetAddress, amount) {
    eventHub.$emit("showLoading", true);
    try {
      await this.imp.transferUSDT(targetAddress, amount);
    } catch (error) {
      this.judgeImp();
    }
    eventHub.$emit("showLoading", false);
  },
  /**
   * 关闭网络
   */
  killWalletConnect() {
    this.imp.killWalletConnect();
  },

  async mint(amount) {
    eventHub.$emit("showLoading", true);
    try {
      await this.imp.mint(amount);
    } catch (error) {
      this.judgeImp();
    }
    eventHub.$emit("showLoading", false);
  },

  // 白名单mint
  async allowlistMint() {
    eventHub.$emit("showLoading", true);
    try {
      await this.imp.allowlistMint();
    } catch (error) {
      this.judgeImp();
    }
    eventHub.$emit("showLoading", false);
  },

  // 特殊mint
  async partnerMint() {
    eventHub.$emit("showLoading", true);
    try {
      await this.imp.partnerMint();
    } catch (error) {
      this.judgeImp();
    }
    eventHub.$emit("showLoading", false);
  },

  // 公开mint
  async publicMint() {
    eventHub.$emit("showLoading", true);
    try {
      await this.imp.publicMint();
    } catch (error) {
      this.judgeImp();
    }
    eventHub.$emit("showLoading", false);
  },
};

export default ethereum;
