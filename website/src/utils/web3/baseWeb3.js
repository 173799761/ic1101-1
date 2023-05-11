import abi from "./abi.json";
import abi721 from "./abi721.json";
import { ElMessage } from "element-plus";
const config = {
  [56]: {
    chainName: "BNB Chain",
    USDT: "0x55d398326f99059fF775485246999027B3197955",
    JumboNFT: "",
  },
  [97]: {
    chainName: "BNB Test Chain",
    USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    JumboNFT: "0x5f6666606870D91bbD37885E6055A5F8B0108b58",
  },
  [5]: {
    chainName: "Goerli Test Chain",
    USDT: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
    JumboNFT: "0x268cc956059e2Ec8578f0491044aF645277A2FCe",
  },
};
export class BaseWeb3 {
  curChainId;
  connector;
  web3;
  ethereum;
  accountAddress;
  chainId;

  provider;

  contractUSDT;
  contractJumboNFT;
  constructor() {
    this.curChainId = 5;
  }

  connect(cb) {
    cb();
  }

  initToken() {
    let tokenAddress = config[this.curChainId]["USDT"];
    this.contractUSDT = new this.web3.eth.Contract(abi, tokenAddress);

    let NFTAddress = config[this.curChainId]["JumboNFT"];
    this.contractJumboNFT = new this.web3.eth.Contract(abi721, NFTAddress);
  }

  async getUSDTBalance() {
    let balance = await this.contractUSDT.methods.balanceOf(
      this.accountAddress
    );
    return balance;
  }

  async killWalletConnect() {}

  async transferUSDT(targetAddress, amount) {}

  async getCost() {
    let number = await this.contractJumboNFT.methods.cost().call();
    return number;
  }

  // 当前活动
  async curActiveType() {
    return await this.contractJumboNFT.methods.curActiveType().call();
  }

  async getWhiteListByAddress(activeType) {
    try {
      return await this.contractJumboNFT.methods
        .getWhiteListByAddress(activeType, this.accountAddress)
        .call();
    } catch (error) {
      ElMessage.error('not eligible for allowlist mint')
    }
  }

  // 白名单mint
  async allowlistMint() {}

  // 特殊mint
  async partnerMint() {}

  // 官方mint
  async mint(amount) {}

  // 公开mint
  async publicMint() {}

  async ethReceipt(string, data, price) {
    let to = config[this.curChainId][string];
    let tx = "";
    try {
      price = price || 0;
      let accountAddress = this.accountAddress;
      var estimateGasRes = await this.web3.eth.estimateGas({
        from: accountAddress,
        to,
        data,
        value: price,
      });
      console.log("estimateGasRes==========", estimateGasRes);

      var gasPrice = await this.web3.eth.getGasPrice();
      console.log("gasPrice===", gasPrice);

      let nonce = await this.web3.eth.getTransactionCount(accountAddress);
      console.log("nonce===", nonce);

      tx = {
        from: accountAddress,
        to,
        nonce: this.web3.utils.toHex(nonce),
        gasPrice,
        gas: estimateGasRes * 2,
        value: price,
        data,
      };
    } catch (error) {
      console.log("error:", error);
    }
    return tx;
  }
}
