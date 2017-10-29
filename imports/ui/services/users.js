import { Meteor } from 'meteor/meteor';

export function getMeteorUserById(userId, callback){
  return Meteor.call("get.user.id", userId, function(error, result){
      callback(error, result);
  })
}

export function getUserById(userId, callback){
  if (Meteor!==undefined) {
    return getMeteorUserById(userId, callback);
  }
}

export function getUserByAgencyId(agencyId, callback){
  return Meteor.call("get.user.agencyId", agencyId, function(error, result){
      callback(error, result);
  })
}
export function countMeteorUsers(callback){
  return Meteor.call('users.count', function(err,rlt){
    callback(err, rlt);
  });
}


export function getMeteorUsersLimit(condition, page, pageSize, callback){
  Meteor.call("get.users.limit", condition, page, pageSize, function(err, rlt){
    callback(err, rlt);
  });
}

export function getUserIdsLimit(condition, page, pageSize, callback){
  Meteor.call('get.userIds.limit', condition, page, pageSize, (err, rlt) =>{
    callback(err, rlt);
  })
}
