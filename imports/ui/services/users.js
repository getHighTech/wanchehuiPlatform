import { Meteor } from 'meteor/meteor';

export function getMeteorUserById(userId, callback){
  return Meteor.call("get.user.id", userId, function(error, result){
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
