import {UserRoles} from './user_roles.js';


export function userBindingRoles(userId,roleIds){
  let user_role = UserRoles.findOne({userId: userId});
  if(user_role){
    //关系表中有userId，更新user_id
    UserRoles.update(user_role,{
      $set: {
        roleIds: roleIds,
      }
    })
  }else{
    UserRoles.insert({
      userId: userId,
      roleIds: roleIds,
      createdAt: new Date(),
    })
  }
}

export function usersFindByRoleId(roleId){
  let user_roles_record =  UserRoles.find({roleIds:{$all:[roleId]}}).fetch();
  let userIds = []
  for(i=0; i<user_roles_record.length;i++){
    userIds.push(user_roles_record[i].userId)
  }
  return Meteor.users.find({_id: {$in: userIds}}).fetch();
}

export function rolesFindByUserId(userId){
  let user_role_record = UserRoles.findOne({userId:userId})
  if(user_role_record){
    return UserRoles.findOne({userId:userId}).roleIds
  } else{
    return []
  }
}