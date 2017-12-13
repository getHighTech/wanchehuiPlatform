import { Meteor } from 'meteor/meteor';



export function getMeteorBalanceChargeUnpaid(conditionUnpaid,page,pageSize,callback){
  Meteor.call("balance.chargesdataUnpaid",conditionUnpaid,page,pageSize,function(err,rlt){
    var bankIds = [];
    var result = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
    }
    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      if (!error) {
        accoutHash = {}
        console.log(accouts);
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
          console.log(accout);
        }
        for(var charge of result) {
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.userId=  accoutHash[charge.userId].realName;
        }
        callback(err, result);
      }
      console.log("error=>", error);
      console.log(result);
    });
    // console.log(rlt);
  });
}

export function getMeteorBalanceChargePaid(conditionPaid,page,pageSize,callback){
  Meteor.call("balance.chargesdataPaid",conditionPaid,page,pageSize,function(err,rlt){
    console.log(rlt);
    var bankIds = [];
    var result = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
    }
    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      if (!error) {
        accoutHash = {}
        console.log(accouts);
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
          console.log(accout);
        }
        for(var charge of result) {
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.userId=  accoutHash[charge.userId].realName;
        }
        callback(err, result);
      }
      console.log("error=>", error);
      console.log(result);
    });
    // console.log(rlt);
  });
}

export function getMeteorBalanceChargeRevoke(conditionRevoke,page,pageSize,callback){
  Meteor.call("balance.chargesdataRevoke",conditionRevoke,page,pageSize,function(err,rlt){
    var bankIds = [];
    var result = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
    }
    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      if (!error) {
        accoutHash = {}
        console.log(accouts);
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
          console.log(accout);
        }
        for(var charge of result) {
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.userId=  accoutHash[charge.userId].realName;
        }
        callback(err, result);
      }
      console.log("error=>", error);
      console.log(result);
    });
    // console.log(rlt);
  });
}


export function countBalanceCharge(condition,callback){
  return Meteor.call('balancecharge.count',condition,function(err,rlt){
    callback(err,rlt)
  })
}
