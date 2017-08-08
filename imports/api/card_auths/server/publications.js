import { Meteor } from 'meteor/meteor';
import { CardAuths } from '../card_auths.js';


Meteor.publish('authed.cards', function(page=0,pagesize=10){
  return CardAuths.find(
    {authedUserId: this.userId},
    {skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}}
  );
});
