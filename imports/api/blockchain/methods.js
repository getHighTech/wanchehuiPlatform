import { Meteor } from 'meteor/meteor';

import { Blockfiles } from './blockfiles.js'
import {checkConsensus, getVersion, getWallet, unlock, initSeed, initWallet, seeSeeds, getAddresses} from './sia.js'

import { HTTP } from 'meteor/http'

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
    console.log(initSeed());
    return initSeed();
  },
  'blockchain.wallet.init'(){
    return initWallet();
  },
  'blockchain.seeds'(){
    return seeSeeds();
  },
  'blockchain.getAddresses'(){
    return getAddresses();
  }
});
