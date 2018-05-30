import { canBeAccessed, CheckRolesAccess, CheckACLAccess } from './accesses';

function createUserRole(userId, roleId){

}
function createUserProdcut(userId, product){

}
function createNewProductRole(user, product){

}

export function buyProuct(
  product,
  user,
  count
)
{
  let roles = [];
  if (!user) {
    return "NEED TO LOGIN"
    roles.push("nobody")
  }else{
    roles.push("login_user")
  }

  UserRoles.find({userId: user._id}).forEach((item)=>{
    roles.push(item.roleName);
  });
  let isAccess = CheckACLAccess(roles, user._id, product.acl, "buy")

  if (isAccess) {
    
  }



}
