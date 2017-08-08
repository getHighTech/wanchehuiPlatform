// 授权行为的关联会员卡的
// 所以在要编写查看授权的事情的时候，要验证有没有这张卡，若是没有，在要删除此卡的授权，
// 若是没有此卡

import { Meteor } from 'meteor/meteor';

import { CardAuths } from './card_auths.js'

Meteor.methods({
  'auth.card.to.user'(authedUserId, cardId, authUserId){
    if (CardAuths.find({authedUserId, cardId}).count()>0) {
      return "授权失败，此用户已经被授权过了"
    }
    let auth_id = CardAuths.insert({
      authedUserId,
      cardId,
      authUserId,
      createdAt: new Date()
    });
    let auth_card = CardAuths.findOne({_id: auth_id});
    let user_auths = Meteor.users.findOne({_id: authedUserId}).auth_cards;
    if (user_auths == undefined) {
      user_auths = [];
    }
    user_auths.push(auth_card);
    Meteor.users.update(authedUserId, {
      $set: {
        auth_cards: user_auths,
      }
    });
  return "授权成功"

},
  'unauth.card.to.user'(authedUserId, cardId){
    let user_auths = Meteor.users.findOne({_id: authedUserId}).auth_cards;
    if (user_auths == undefined) {
      user_auths = [];
    };
    user_auths = [];

    Meteor.users.update(authedUserId, {
      $set: {
        auth_cards: user_auths,
      }
    });
    let auth_id = CardAuths.findOne({authedUserId, cardId})._id
    CardAuths.remove({_id: auth_id});


    return "取消授权成功"

  }
})
