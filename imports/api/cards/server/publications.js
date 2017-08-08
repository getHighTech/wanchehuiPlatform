import { Meteor } from 'meteor/meteor';
import { Cards } from '../cards.js';


Meteor.publish('cards.published', function(page=0,pagesize=5){
  let agency = ServerSession.get("superAgencyId");
  console.log(agency);
  return Cards.find(
    {publishUserId: this.userId},
    {skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}}
  );
});

Meteor.publish('cards.published.one', function(id){
  return Cards.find({_id: id});
});


Meteor.publish('wanchehui.cards', function(){
  let user = Meteor.users.findOne({username: "wanchehui"});
  return Cards.find({publishUserId: user._id});
});
Meteor.publish('cards.by.idlist', function(idlist){
  return Cards.find({_id: {$in: idlist}});
});
