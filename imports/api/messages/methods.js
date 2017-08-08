import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from './messages.js';
import { MessageBoxes } from './message_boxes.js';
Meteor.methods({
  'messages.insert'(userId, toUser,state, content) {

    //我们先不使用消息盒子的概念
  	// let message_box_id = null;
  	// if (MessageBoxes.find({$or: [{userA: userId},{userB: userId}]}).count() == 0) {
  	// 	message_box_id = MessageBoxes.insert({
  	// 		userA: userId,
  	// 		userB: toUser
  	// 	});
  	// }else{
  	// 	message_box_id = MessageBoxes.findOne({$or: [{userA: userId},{userB: userId}]})._id;
  	// }

    return Messages.insert({
      userId,
      toUser,
      content,
      state,
      messageBox: message_box_id,
      createdAt: new Date(),
    });
  },
});
