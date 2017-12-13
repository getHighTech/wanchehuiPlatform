import { Meteor } from 'meteor/meteor';
import {getRoleByUsername} from './actions.js';
import { Roles } from './roles.js'

Meteor.methods({
  'role.by.username'(username) {
    return getRoleByUsername(username);
  },
  'role.insert'(params){
    console.log(params)
    return Roles.insert({
        name_zh: params.roleName,
        name: params.tagName,
        permissions:params.permission,
        state: true, 
        weight: 0,  //0权重权限最大
        createdAt : new Date(), 
        isSuper: false,
      });
    },
});
