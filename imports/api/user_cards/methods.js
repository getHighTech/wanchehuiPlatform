import { Meteor } from 'meteor/meteor';

import { deleteCardByUserId, giveCardByUserId } from './actions';

Meteor.methods({
  "cards.delete.by.user"(userId){
    return deleteCardByUserId(userId);
  },
  'cards.give.by.user'(userId){
    return giveCardByUserId(userId);
  }
});
