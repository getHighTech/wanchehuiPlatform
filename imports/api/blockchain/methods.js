import { Meteor } from 'meteor/meteor';

import { Blockfiles } from './blockfiles.js'
import {checkConsensus, getVersion, getWallet, unlock, initSeed, initWallet, seeSeeds} from './sia.js'
Meteor.methods({
  "blockfiles.insert"(userId, blockPath, info, name, file){
    //检查sia网络状态
    //写入sia网络
    //
    let fdir = '/'
    return Blockfiles.insert({
      userId, blockPath, info, name, fdir,
      createdAt: new Date()
    })
  },
  'blockchain.check'(){
    return checkConsensus();
  },
  'blockchain.getVersion'(){
    return getVersion();
  },
  'blockchain.getWallet'(){
    return getWallet();
  },
  'blockchain.wallet.unlock'(){
    return unlock();
  },
  'blockchain.init.seed'(){
    return initSeed();
  },
  'blockchain.wallet.init'(){
    return initWallet();
  },
  'blockchain.seeds'(){
    return seeSeeds();
  }
});
