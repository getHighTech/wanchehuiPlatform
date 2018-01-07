import { Roles } from '/imports/api/roles/roles.js';

export function CheckRolesAccess(roles, moduleName, opera){
  if (roles.lenght === 0) {
    roles.push("nobody");
    console.log('该用户没有任何角色')
  }
  let isAccess = false;
  for (var i = 0; i < roles.length; i++) {
    isAccess = Roles.findOne({name:roles[i]}).permissions[moduleName][opera]
    console.log(Roles.findOne({name:roles[i]}))
    console.log(Roles.findOne({name:roles[i]}).permissions);
    if (isAccess === undefined ) {
      isAccess = false;
    }else if (isAccess === true) {
      break;
    }
  }
  return isAccess;
}

export function CheckACLAccess(roles, userId, acl, opera){
  let aclOpera = acl[opera];

  if(!aclOpera.users.includes(userId)){
    return false;
  }
  let isAccess = false;
  if (roles.length === 0) {
    roles.push("nobody");
  }
  for (var i = 0; i < roles.length; i++) {
    for (var j = 0; j < aclOpera.roles.length; j++) {
      if (aclOpera.roles[j] === roles[i]) {
        isAccess = true;
        break;
      }
    }
  };
  return isAccess;

}

export function canAccess(CheckRolesAccess, CheckACLAccess){
  if (CheckRolesAccess) {
    if (CheckACLAccess) {
      return true;
    }
  }
  return false;
}
