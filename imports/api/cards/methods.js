import { Meteor } from 'meteor/meteor';

import { Cards } from './cards.js'

Meteor.methods({
  'cards.insert'(name, slogan,price, description,overtime,intro){
    Cards.insert({
      name,
      slogan,
      price,
      description,
      overtime,
      intro,
      publishUserId: Meteor.userId(),
      createdAt: new Date()
    })
  },
  'cards.remove'(id){
    return Cards.remove(id);
  },
  'cards.update'(id, name, slogan,price,description, overtime,intro){
    return Cards.update(id, {
      $set:{
        name, slogan, price, description, overtime, intro
      }
    });
  },
  'get.first.card.wanchehui'(){

    let wanchehui = Meteor.users.findOne({username: 'wanchehui'});
    return Cards.findOne({publishUserId: wanchehui._id});
  },
  'get.card.getone.id'(id){
    return Cards.findOne({_id: id});
  }
});
