import { Meteor } from 'meteor/meteor';

import { Coupons } from './coupons.js'

Meteor.methods({
  'coupons.insert'(type, cardGifts, cardCount, content){
    Coupons.insert({
      type, cardGifts, cardCount,
      publishedUserId: Meteor.userId(),
      content,
      createdAt: new Date()
    })
  },
  'coupons.remove'(id){
    return Coupons.remove(id);
  },
  'user.coupons.used'(couponId){
    console.log(couponId);
    let coupons = Meteor.user().coupons;
    for (var i = 0; i < coupons.length; i++) {
      if (couponId == coupons[i].couponId) {
        let count = coupons[i].count;
        count = parseInt(count);
        count--;
        coupons[i].count = count;
      }
    }
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        coupons
      }
    });
  }
});
