function checkModulePressionByRoleCollection(roleCollection, moduleString){
  return false;
}
function checkACLByRoleCollection(roleCollection, ACL){
  return false;
}
export function canBeAccessed(roleCollection, moduleString, ACL, weight){
  //若是权重没有没有达标，不管如何吹牛逼，就是通不过。
  if (ACL.weight < weight) {
    return "ACCESS DENY"
  }
  if (roleCollection.weight < weight) {
    return "ACCESS DENY";
  }
  if (!checkModulePressionByRoleCollection(roleCollection, moduleString)) {
    return "ACCESS DENY";
  }



  return true;
}