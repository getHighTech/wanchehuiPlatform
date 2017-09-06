import { Meteor } from 'meteor/meteor';

export function getUserByUsername(username){
  
  return Meteor.users.findOne({username})
}
