import { Meteor } from 'meteor/meteor';

export function allUsersMount(){
  return Meteor.users.find().count();
}
