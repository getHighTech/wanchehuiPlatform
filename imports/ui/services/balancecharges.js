import { Meteor } from 'meteor/meteor';



export function getMeteorBalanceCharge(condition,page,pageSize,callback){
  Meteor.call("balance.chargesdata",condition,page,pageSize,function(err,rlt){
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
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
        }
        for(var charge of result) {
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.userId=  accoutHash[charge.userId].realName;
        }
        callback(err, result);
      }
    });

  });
}



export function countBalanceCharge(condition,callback){
  console.log(condition);
  return Meteor.call('balancecharge.count',condition,function(err,rlt){
    console.log(rlt);
    callback(err,rlt)
  })
}
