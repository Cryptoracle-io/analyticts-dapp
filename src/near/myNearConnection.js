import * as nearAPI from "near-api-js";
import { getConfig } from "./confign";
const { utils, keyStores, KeyPair,KeyPairEd25519, connect, Contract } = nearAPI;
const depositInYocto = utils.format.parseNearAmount("0.002");
const THIRTY_TGAS = '300000000000000';
const NO_DEPOSIT = '0';

export class NearClient {
  constructor(privateKey, accountId) {
    this.privateKey = privateKey;
    this.accountId = accountId;
  }

  async init() {
    
    this.myKeyStore = new keyStores.InMemoryKeyStore();
    this.keyPair = KeyPair.fromString(this.privateKey);
    await this.myKeyStore.setKey("mainnet", this.accountId, this.keyPair);

    let connectionConfig = getConfig('mainnet');

    connectionConfig.keyStore = this.myKeyStore;
    
    this.nearConnection = await connect(connectionConfig);
    this.account = await this.nearConnection.account(this.accountId);
  }

  async createContract(contractId, viewMethods, changeMethods) {
    this.contract = new Contract(this.account, contractId, {
      viewMethods,
      changeMethods,
    });
  }

  async callContractMethod(methodName, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT) {
    const result = await this.contract[methodName](
      args,
      gas,
      deposit
    );
    return result;
  }
  
  // Get transaction result from the network
  async getTransactionResult(recipID) {
    const boby = await JSON.parse(`{"0":{"value":"${recipID}"}}`)
    const rawResponse = await fetch(`https://backend-testnet.prod.gcp.explorer.near.org/trpc/utils.search?batch=1`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: boby
    });
    
    const content = await rawResponse.json();
    //console.log("rawResponse",content)
    return content[0].result.data.transactionHash;
  }
}
