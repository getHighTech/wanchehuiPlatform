const sia_seed = "duets coils eluded lexicon licks feel victim shackles guarded kidneys eight joining sieve ointment sidekick punch bested lexicon cavernous drowning olive hookup taboo mechanic general royal leech polar acumen";
import { connect } from 'sia.js'
//链接区块链网络,链接成功后回调
export function connectBlock(callback){
  return connect('localhost:9980').then((siad)=>callback(siad)).catch(
    (err) => {
      console.log(err);
    }
  );
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

}

export function initSeed(){

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
