import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { BaseWeb3 } from "./baseWeb3";

const rpcConfig = {
  97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  56: "https://bsc-dataseed1.binance.org/",
};

export class connectWallet extends BaseWeb3 {
  initProvider() {
    this.provider = new WalletConnectProvider({
      rpc: rpcConfig,
    });
  }
  async connect(cb) {
    this.connector = this.provider.connector;
    this.web3 = new Web3(this.provider);
    this.subscribeToEvents(cb);
    if (!this.provider.connector.connected) {
      this.provider.enable();
    } else {
      this.accountAddress = this.connector.accounts[0];
      this.chainId = this.connector.chainId;
      this.initToken();
      cb();
    }
  }

  async subscribeToEvents(cb) {
    let connector = this.connector;

    if (!connector) {
      return;
    }

    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);

      if (error) {
        throw error;
      }
    });

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`, payload);
      const accounts = payload.params[0].accounts;
      const chainId = payload.params[0].chainId;
      this.accountAddress = accounts[0];
      this.chainId = chainId;
      this.initToken();
      cb();
      if (error) {
        throw error;
      }
    });

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);
      if (error) {
        throw error;
      }
    });
  }

  async killWalletConnect() {
    console.log("killWalletConnect");
    this.provider.disconnect();
  }

  async transferUSDT(targetAddress, amount) {
    amount = this.web3.utils.toWei(amount + "", "ether");
    let transferData = await this.contractUSDT.methods
      .transfer(targetAddress, amount + "")
      .encodeABI();
    let tx = await this.ethReceipt("USDT", transferData);
    let tx_receipt = await this.connector.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  async mint(amount) {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.mint(amount).encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.connector.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  // 特殊mint
  async partnerMint() {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.partnerMint().encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.connector.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  // 官方mint
  async allowlistMint() {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.allowlistMint().encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.connector.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }

  // 公开mint
  async publicMint() {
    let cost = await this.getCost();
    let data = await this.contractJumboNFT.methods.publicMint().encodeABI();
    cost = this.web3.utils.toHex(cost);
    let tx = await this.ethReceipt("JumboNFT", data, cost);
    let tx_receipt = await this.connector.sendTransaction(tx);
    console.log("tx_receipt:", tx_receipt);
  }
}
