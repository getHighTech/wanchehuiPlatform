import { Meteor } from 'meteor/meteor';

import { Bankcards } from './bankcards.js'

Meteor.methods({
  "bankcards.insert"(userId, realName, accountNumber, bankAddress){
    return Bankcards.insert({
      userId, realName, accountNumber, bankAddress,
      createdAt: new Date()
    })
  },
  'bankcards.remove'(id){
    return Bankcards.remove(id);
  },

  'bankcards.accountNumber'(_id){
    return Bankcards.findOne({userId:_id}).accountNumber;
  },
  'backcards.accouts'(ids) {
    return Bankcards.find({userId: {$in: ids}});
  },
});
