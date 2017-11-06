import { Meteor } from 'meteor/meteor';


export function getMeteorAgenciesLimit(condition, page, pageSize, callback){
  return Meteor.call('get.agencies.limit',condition, page, pageSize, function(err, rlt){
    return callback(err, rlt);
  });
}

export function getAgencyByUserId(userId, callback){
  return Meteor.call("agency.userId", userId, function(err, rlt){
    callback(err, rlt);
  })
}


export function changeSuperAgency(agencyId, superAgencyId, giveReason, loseReason, productId, callback){
  if (Meteor) {
    Meteor.call('agencies.changeSuperAgency', agencyId,
    superAgencyId,giveReason, loseReason, productId, function(err, rlt){
      callback(err, rlt);
    });
  }
};
