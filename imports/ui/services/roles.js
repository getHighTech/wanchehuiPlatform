import { Meteor } from 'meteor/meteor';


export function getMeteorRolesLimit(condition, page, pageSize, callback){
  Meteor.call("get.roles.limit", condition, page, pageSize, function(err, rlt){
    callback(err, rlt);
  });
}

export function countRoles(callback){
  return Meteor.call('roels.count', function(err,rlt){
    callback(err, rlt);
  });
}