import { Meteor } from 'meteor/meteor';


export function getMeteorAgenciesLimit(condition, page, pageSize, callback){
  return Meteor.call('get.agencies.limit',condition, page, pageSize, function(err, rlt){
    return callback(err, rlt);
  });
}
