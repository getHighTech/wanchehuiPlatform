import { Meteor } from 'meteor/meteor';
import { userBindingRoles,usersFindByRoleId,rolesFindByUserId,userBindingShopOwner,rolesNameFindByUserId } from './actions'
import {UserRoles} from './user_roles.js';
import {Roles} from '../roles/roles.js'

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
  'rolesAcl.find_by_user_id'(userId){
      console.log(userId)
      let user_role_record = UserRoles.find({'userId': userId,'status': true}).fetch();
      let result = false
      if(user_role_record.length > 0){
        for (let i = 0; i < user_role_record.length; i++) {
          if(Roles.findOne({ '_id':user_role_record[i].roleId,'permissions.orders':{$exists:true}})){
            let access  = Roles.findOne({_id:user_role_record[i].roleId}).permissions.orders.updatable;
            if(access){
              result = true
            }
          }
        }  
        return result
      } else{
        return result
      }
  },
  'user.binding.shopOwner'(userId,OldOwner,role_name){
    return userBindingShopOwner(userId,OldOwner,role_name)
  },
  'roleNames.find_by_user_id'(userId){
    return rolesNameFindByUserId(userId)
  },

});
