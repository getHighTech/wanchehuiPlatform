import { Meteor } from 'meteor/meteor';



export function getMeteorBalanceCharge(condition,page,pageSize,callback){
  Meteor.call("balance.chargesdata",condition,page,pageSize,function(err,rlt){
    var bankIds = [];
    var result = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      let address='address';
      charge[address]='1';
      let name='name';
      charge[name]='1';
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
    }

    Meteor.call("get.users.accouts", bankIds, function(error, accouts) {
      if (!error) {
        accoutHash = {}
        for(let accout of accouts) {
          accoutHash[accout._id] = accout;
        }
        for(var charge of result) {
<<<<<<< HEAD
          charge.name = accoutHash[charge.userId].username;
=======
          charge.name = accoutHash[charge.userId].name;
>>>>>>> b0990c14c8cb2c8dcbaf1eb1c7be07d8a45902fa
      }

      }
    });

<<<<<<< HEAD

    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      console.log(accouts)
=======
    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      console.log(accouts);
>>>>>>> b0990c14c8cb2c8dcbaf1eb1c7be07d8a45902fa
      if (!error) {
        accoutHash = {}
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
        }
        for(var charge of result) {
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.address= accoutHash[charge.userId].bankAddress;
          charge.userId =  accoutHash[charge.userId].realName;
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
