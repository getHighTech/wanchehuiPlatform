import { Meteor } from 'meteor/meteor';


export function findMeteorBalanceByUsername(username, callback){
  return Meteor.call("balance.username",username, function(error, result){
      callback(error, result);
  })
}

export function findBalanceByUsername(username, callback){
  if (Meteor) {
    return findMeteorBalanceByUsername(username, callback);
  }
}

export function findLowerAgenciesById(id, callback){
  return Meteor.call("balances.superAgencyId", id, function(error, result){
    return callback(error, result);
  })
}
