import { Meteor } from 'meteor/meteor';
import {RoleOrderStatus} from './role_order_status.js';


Meteor.methods({
  'role_order_status.insert'(params){
    console.log('-----------------------------------------');
    console.log(params);
    RoleOrderStatus.insert({
      orderCode:params.orderCode,
      status:params.status,
      accessesable:true,
      createdAt: new Date()
    })
  }
})
