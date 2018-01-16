import { Meteor } from 'meteor/meteor';
import { userBindingRoles,usersFindByRoleId,rolesFindByUserId,userBindingShopOwner } from './actions'

Meteor.methods({
  'user.binding.roles'(userId,roleIds){
    return userBindingRoles(userId,roleIds)
  },
  'users.find_by_role_id'(roleId){
    return usersFindByRoleId(roleId)
  },
  'roles.find_by_user_id'(userId){
    return rolesFindByUserId(userId)
  },
  'user.binding.shopOwner'(userId, role_name){
    return userBindingShopOwner(userId,role_name)
  }
});