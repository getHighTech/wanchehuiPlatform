import { Meteor } from 'meteor/meteor';


export function getMeteorAgenciesLimit(condition, page, pageSize, callback){
  return Meteor.call('get.agencies.limit',condition, page, pageSize, function(err, rlt){
    return callback(err, rlt);
  });
}

export function changeSuperAgency(agencyId, superAgencyId, giveReason, loseReason, productId, callback){
  if (Meteor) {
    return Meteor.call('agencies.changeSuperAgency', agencyId,
       superAgencyId, giveReason, loseReason, productId, function(err, rlt){
         callback(err, result);
       })
  }
}
