import { Meteor } from 'meteor/meteor';


export function getMeteorRolesLimit(condition, page, pageSize, callback){
  Meteor.call("get.roles.limit", condition, page, pageSize, function(err, rlt){
    callback(err, rlt);
  });
}

export function countRoles(callback){
  return Meteor.call('roles.count', function(err,rlt){
    callback(err, rlt);
  });
}

export function getAllRoles(callback){
  return Meteor.call('roles.all',function(err,rlt){
    callback(err,rlt);
  })
}


export function userBindingRoles(userId,roles){
  return Meteor.call('user.binding.roles',userId,roles,function(err,rlt){
    
  })
}