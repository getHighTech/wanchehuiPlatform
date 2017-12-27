import { Meteor } from 'meteor/meteor';



export function getMeteorBalanceCharge(condition,page,pageSize,callback){
  Meteor.call("balance.chargesdata",condition,page,pageSize,function(err,rlt){
    var bankIds = [];
    var result = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      charge.address = "1"
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
    }
    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      console.log(accouts)
      if (!error) {
        accoutHash = {}
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
        }
        console.log(accoutHash)
        for(var charge of result) {
          console.log(charge.userId)
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.address = accoutHash[charge.userId].bankAddress;
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
    callback(err,rlt)
  })
}
