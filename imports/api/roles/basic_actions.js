import { Roles } from './roles.js';

import {getUserByUsername} from '/imports/api/users/basic_actions.js'

export function getRoleByUsername(username){
//根据用户名获取角色
  let user = getUserByUsername(username);
  if (user === undefined) {
    return null;
  }
  return Roles.findOne({_id: user.roleId});

}
