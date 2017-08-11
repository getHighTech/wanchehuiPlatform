const sia_seed = "duets coils eluded lexicon licks feel victim shackles guarded kidneys eight joining sieve ointment sidekick punch bested lexicon cavernous drowning olive hookup taboo mechanic general royal leech polar acumen";
import { connect } from 'sia.js'
//链接区块链网络,链接成功后回调
export function connectBlock(callback){
  return connect('45.32.25.210:8975').then((siad)=>callback(siad));
}
//查看网络的基本信息
export function checkConstants(){
  connectBlock((siad)=>{

  });
}
export function checkConsensus(){
  return HTTP.call("GET", "http://45.32.25.210:8975/consensus", {
    headers: {
      'User-Agent': 'Sia-Agent',
    },
    auth: ":7686043104xsq"
  })

}
export function unlock(){
  try {
    return HTTP.call("POST", "http://45.32.25.210:8975/wallet/unlock", {
      headers: {
        'User-Agent': 'Sia-Agent',
      },
      auth: ":7686043104xsq",
      params: {
        encryptionpassword: sia_seed,
      }
    })
  } catch (e) {
    console.error('unlock err',e.message);
    return e
  }
}
export function seeSeeds(){
  return HTTP.call("GET", "http://45.32.25.210:8975/wallet/seeds", {
    headers: {
      'User-Agent': 'Sia-Agent',
    },
    auth: ":7686043104xsq"
  })
}
export function initWallet(){
  try {
    return HTTP.call("POST", "http://45.32.25.210:8975/wallet/init", {
      headers: {
        'User-Agent': 'Sia-Agent',
      },
      auth: ":7686043104xsq",

    });
  } catch (e) {
    console.log("",e);
    return e
  }
}

export function initSeed(){
  try {
    return HTTP.call("POST", "http://45.32.25.210:8975//wallet/init/seed", {
      headers: {
        'User-Agent': 'Sia-Agent',
      },
      auth: ":7686043104xsq",
      params: {
        encryptionpassword: sia_seed,
        seed: sia_seed,
        force: true,
      }
    });
  } catch (e) {
    console.log("init seed", e);
    return e
  }


}

export function getVersion(){
  return connectBlock((siad)=>{
    return siad.call('/daemon/version')
  });
}
export function getAdresses(){

}
export function getWallet(){

  return HTTP.call("GET", "http://45.32.25.210:8975/wallet", {
    headers: {
      'User-Agent': 'Sia-Agent',
    },
    auth: ":7686043104xsq"
  })
}
