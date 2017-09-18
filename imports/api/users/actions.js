import { Meteor } from 'meteor/meteor';

export function allUsersMount(){
  return Meteor.users.find().count();
}

export function allCardUsersMount(){
  return Meteor.users.find({cards: {$exists: true}}).count();
}
