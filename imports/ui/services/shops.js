import { Meteor } from 'meteor/meteor';

export function getMeteorShopsLimit(condition, page, pageSize, callback){
    Meteor.call("get.shops.limit", condition, page, pageSize, function(err, rlt){
      callback(err, rlt);
    });
  }

export function countShops(callback){
    return Meteor.call('shops.count', function(err,rlt){
      callback(err, rlt);
    });
}


// export function getOneShopData(callback){
//     return Meteor.call('get.shops.data', function(err,rlt){
//       callback(err, rlt);
//       console.log(rlt);
//     });
// }
