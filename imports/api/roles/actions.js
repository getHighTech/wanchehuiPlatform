import { Roles } from './roles.js';

import {getUserByUsername} from '/imports/api/users/basic_actions.js'

export function getRoleByUsername(username){
//根据用户名获取角色
  let user = getUserByUsername(username);
  console.log('打印用户'+user.username);
  if (user === undefined) {
    console.log('走了这');
    return null;
  }
  return Roles.findOne({_id: user.roleId});

}

export function createOneRole(name, name_zh, accesses,weight){

}

export function permitRoleRule(role, moduleName, weight, curd){
  if (isSuper) {
    return true;
  }
//  if (role.weight> weight !role.accesses[moduleName][curd]) {
 //   return false;
 // }

}

export function rolesBindingUser(roleId,userId){
  Roles.update(roleId,{
    $push:{
      users: { userId }
    }
  })
}
export function getRoleById(roleId) {
  let role =  Roles.findOne({_id:roleId})
  if (role === undefined){
    return null;
  }else{
    return role
  }
}
export function getRoleByName(name) {
  let role =  Roles.findOne({name:name})
  if (role === undefined){
    return null;
  }else{
    return role
  }
}
