const sia_seed = "duets coils eluded lexicon licks feel victim shackles guarded kidneys eight joining sieve ointment sidekick punch bested lexicon cavernous drowning olive hookup taboo mechanic general royal leech polar acumen";
import { connect } from 'sia.js'
//链接区块链网络,链接成功后回调
export function connectBlock(callback){
  return connect('127.0.0.1:9980').then((siad)=>callback(siad));
}
//查看网络的基本信息
export function checkConstants(){
  connectBlock((siad)=>{

  });
}
export function checkConsensus(){

  return connectBlock((siad)=>{
    return siad.call('/consensus')
  });

}
export function unlock(){
  return connectBlock((siad)=>{
    return siad.call({
    url: '/wallet/unlock',
    method: 'POST',
    header: "Authorization: Basic OmZvb2Jhcg==",
    qs: {
      encryptionpassword: sia_seed,
    },
  }).catch(
    (err) => {

      console.log(err);

      return err;

    }
  )
  });
}
export function seeSeeds(){
  return connectBlock((siad)=> {
    return siad.call("/wallet/seeds");
  })
}
export function initWallet(){
  return connectBlock((siad)=>{
    return siad.call({
    url: '/wallet/init',
    method: 'POST',
  }).catch(
    (err) => {

      console.log(err);

      return err;

    }
  )
  });
}

export function initSeed(){
  return connectBlock((siad)=>{
    return siad.call({
    url: '/wallet/init/seed',
    method: 'POST',
    qs: {
      encryptionpassword: sia_seed,
      seed: sia_seed,
      force: true,
    },
  }).catch(
    (err) => {

      console.log(err);

      return err;

    }
  )
  });
}

export function getVersion(){
  return connectBlock((siad)=>{
    return siad.call('/daemon/version')
  });
}
export function getAdresses(){

}
export function getWallet(){
  return connectBlock((siad)=>{
    return siad.call('/wallet')
  });
}
