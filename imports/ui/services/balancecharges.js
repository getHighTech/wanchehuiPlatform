import { Meteor } from 'meteor/meteor';



export function getMeteorBalanceCharge(condition,page,pageSize,callback){
  Meteor.call("balance.chargesdata",condition,page,pageSize,function(err,rlt){
    var bankIds = [];
    var result = [];
    var selectbank = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      let address='address';
      charge[address]='1';
      let name='name';
      charge[name]='1';
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
      let bankId = charge.bankId;
      selectbank.push(bankId)
    }

    Meteor.call("get.users.accouts", bankIds, function(error, accouts) {
      if (!error) {
        accoutHash = {}
        for(let accout of accouts) {
          accoutHash[accout._id] = accout;
        }
        for(var charge of result) {
          charge.name = accoutHash[charge.userId].username;
      }
        }
    });


    Meteor.call("bankcards.accouts", selectbank, function(error, accouts) {

      if (!error) {
        accoutHash = {}
        for(let accout of accouts) {
          accoutHash[accout._id] = accout;
        }
        for(var charge of result) {
          charge.address= accoutHash[charge.bankId].bankAddress;
          charge.userId =  accoutHash[charge.bankId].realName;
          charge.bankId = accoutHash[charge.bankId].accountNumber;
      }
        callback(err, result);
      }
    });

  });
}



export function countBalanceCharge(condition,callback){
  return Meteor.call('balancecharge.count',condition,function(err,rlt){
    callback(err,rlt)
  })
}
