
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Activities } from './activities.js';
import { Follows } from '../follows/follows.js';
import { Fans } from '../fans/fans.js';
import { Messages } from '../messages/messages.js';
Meteor.methods({
  'activities.insert'(userId, type, obj) {
    const result = Activities.insert({
      userId,
      type,
      obj,
      createdAt: new Date(),
    });
    let follows = Follows.find({userId}).fetch();
    for (var i = 0; i < follows.length; i++) {
      //把关注上的热门都链接上,这样方便订阅最近发布消息的关注者
      Follows.update(follows[i]._id, {
        $set:{
          recentPost: new Date()
        }
      });
    }


    return result
  },
  'activities.soft_delete'(activeId, deleted) {
    let result = Activities.update(activeId,{
      $set: {
        deleted
      }
    });
    return result
  },

  'activities.reg'(){
  	let wanchehui = Meteor.users.findOne({username: "wanchehui"});
  	let follow_id = Follows.insert({
  		userId: Meteor.userId(),
  		username: Meteor.user().username,
  		followed: wanchehui._id,
  		followed_name: wanchehui.username,
  		createdAt: new Date()
  	});

  	let follow = Follows.findOne({_id: follow_id});


  	Activities.insert({
      userId: Meteor.userId(),
      type: 'follow',
      obj: follow,
      createdAt: new Date(),
    });
   	Activities.insert({
      userId: Meteor.userId(),
      type: 'reg',
      obj: Meteor.user().username,
      createdAt: new Date(),
    });
    let message_id = Messages.insert({
      userId: wanchehui._id,
      username: wanchehui.username,
      toUser: Meteor.userId(),
      toUsername: Meteor.user().username,
      content: "<h3>欢迎进入万车汇大家庭<a href='/admin/apply_now'>立刻成为会员</a>,或者给我发消息吧</h3>,",
      state: 0,
      createdAt: new Date(),
    });

    let message = Messages.findOne({_id: message_id});

    Activities.insert({
      userId: Meteor.userId(),
      type: 'message',
      obj: message,
      createdAt: new Date(),
    });
  }
});
