import { Roles } from './roles.js';

import {getUserByUsername} from '/imports/api/users/actions.js'

export function getRoleByUsername(username){
//根据用户名获取角色
  let user = getUserByUsername(username);
  if (user === undefined) {
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
  // if (role.weight > weight !role.accesses[moduleName][curd] ) {
  //   return false;
  // }

}
