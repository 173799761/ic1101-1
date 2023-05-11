import Web3 from "web3";
import { BaseWeb3 } from "./baseWeb3";

export class metaMask extends BaseWeb3 {
  async connect(cb) {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        this.web3 = new Web3(window.web3.currentProvider);
      } catch (error) {
        console.log("error", error);
      }
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.location.href = "https://metamask.io/";
      return;
    }

    let account = await this.web3.eth.getAccounts();
    this.accountAddress = account[0];
    // await this.initToken();
    cb();

    let chainId = await this.getChainId();
    // if (chainId != this.curChainId) {
    //   await this.changeChain();
    // } else {
    //   let account = await this.web3.eth.getAccounts();
    //   this.accountAddress = account[0];
    //   await this.initToken();
    //   cb();
    //   console.log("connect success");
    // }
  }

  //判断链id
  async getChainId() {
    //！链id不是马上拿到的，如果通过链id来判断是不是主网的方式，请注意异步
    try {
      let chainId = await this.web3.eth.getChainId();
      return chainId;
    } catch (error) {
      console.error("error:", error);
    }
  }

  // 切换钱包chainId
  async changeChain() {
    try {
      let chainId = await this.getChainId();
      if (chainId != this.curChainId) {
        //切换网络
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: Web3.utils.numberToHex(this.curChainId), // 目标链ID
            },
          ],
        });
      }
    } catch (error) {
      if (error.code == 4001) {
        //取消切链
        console.log("error: 取消切链", error);
      } else {
        //切链失败
        console.log("error: 切链失败");
      }
    }
  }

  async killWalletConnect() {}

  async transferUSDT(targetAddress, amount) {
    amount = this.web3.utils.toWei(amount + "", "ether");
    let transferData = await this.contractUSDT.methods
      .transfer(targetAddress, amount + "")
      .encodeABI();
    let tx = await this.ethReceipt("USDT", transferData);
    let tx_receipt = await this.web3.eth.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  async mint(amount) {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.mint(amount).encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.web3.eth.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  async allowlistMint() {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.allowlistMint().encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.web3.eth.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  async partnerMint() {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.partnerMint().encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.web3.eth.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  async publicMint() {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.publicMint().encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.web3.eth.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }
  
}
