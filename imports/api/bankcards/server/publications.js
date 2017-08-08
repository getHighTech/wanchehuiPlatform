// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Bankcards } from '../bankcards.js';



Meteor.publish('get.user.bankcards', function(){
  return Bankcards.find({userId: this.userId});
})
