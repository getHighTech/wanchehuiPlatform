import { Meteor } from 'meteor/meteor';

export function allUsersMount(){
  return Meteor.users.find().count();
}

export function allCardUsersMount(){
  return Meteor.users.find({cards: {$exists: true}}).count();
}


export function findUserByMobile(mobile){
  return Meteor.users.findOne({"profile.mobile": mobile});
}

export function findUserById(id){
  return Meteor.users.findOne({_id: id});
}

export function findOrCreateUserByMobile(mobile){
  let user =  Meteor.users.findOne({"profile.mobile": mobile});
  if (user == undefined) {
    let user_id =   Accounts.createUser({
          username: "mobile",
          password: "mobile",
        });
      Meteor.users.update(newUserId,{
          $set: {
            "profile.mobile": mobile
          }
        });
    user = Meteor.users.findOne({_id: user_id});
  }
  return user;
}
