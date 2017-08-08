import { Meteor } from 'meteor/meteor';
import { Coupons } from '../coupons.js';

//根据不同类型获取优惠券
Meteor.publish('coupons.published', function(type='discount', page=0,pagesize=30){
  
  return Coupons.find(
    {type: type, publishedUserId: this.userId},
    {skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}}
  );
});
Meteor.publish('coupons.published.alltype', function( page=0,pagesize=30){

  let wanchehui = Meteor.users.findOne({username: 'wanchehui'});
  return Coupons.find(



    {
      $or: [
      {publishedUserId: this.userId},
      {publishedUserId: wanchehui._id}
    ]
    },


    {skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}}
  );
});

Meteor.publish('coupons.by.idlist', function(idlist){
  return Coupons.find({_id: {$in: idlist}},{sort:{createdAt: -1}});
})
