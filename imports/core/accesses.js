import { Roles } from '/imports/api/roles.js';

function checkModulePressionByRoleCollection(roleCollection, moduleString, weight, opera){
  let isAccess = false
  for (var i = 0; i < roleCollection.length; i++) {
      let role = Roles.find({name: roleCollection[i]});
      if (role.weight <= weight) {
        isAccess = true;
        if (role[moduleString]!=undefined) {
          isAccess =  role.permissions[moduleString][opera];
          continue;
        }else{
          continue;
        }
      }else{
        isAccess = false;
      }

  }
  return isAccess;
}
function checkACLByRoleCollection(roleCollection, ACL, weight){
  let matchCount = 0;
  let disMatchPoiners = [];
  let disMatchRoles = [];
  if (ACL.weight > weight) {
    return false;
  }
  for (var i = 0; i < ACL.roles.length; i++) {
    let isMatch = false
    for (var j= 0; j < roleCollection.length; j++) {
      if (roleCollection[j]==ACL[i]) {
        matchCount++;
        isMatch = true;
        break;
      }
    }
    if (!isMatch) {
      disMatchPoiners.push(i);
    }
  }
  if (matchCount != ACL.roles.length) {
    for (var k = 0; k < disMatchPoiners.length; k++) {
      disMatchRoles.push(ACL.roles[disMatchPoiners[i]]);
    }
    return disMatchPoiners;
  }else{
    return 1;
  }
}

export function moduleCanBeAccess(
   roleCollection=["nobody"],//eg:["nobody", "login", "blackCardHolder"]
   moduleString="shops",
   acl,
   weight,
   opera //read edit buy delete
 )
 {
   let failMessage = {};

  if (checkModulePressionByRoleCollection(roleCollection, moduleString, opera)===1) {
    return 1;
  }else{
    failMessage.moduleString = checkModulePressionByRoleCollection(roleCollection, moduleString, opera);
    return failMessage;
  }
  if (acl!="NOACL") {
    if (checkACLByRoleCollection(roleCollection, ACL, weight, opera)===1) {
      return 1;
    }else{
      failMessage.aclMissing = checkACLByRoleCollection(roleCollection, ACL, weight, opera);
      return failMessage;
    }
  }
  return 1;

}
