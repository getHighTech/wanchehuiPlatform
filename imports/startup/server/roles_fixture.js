import { Roles } from '../../api/roles/roles.js';
//这里预设好所有的用户及其角色
export function prebuildAdmin(){
  let roles = Roles.find({name: "superAdmin"});
  let newAdminId = null;

  if (roles.count()===0) {
    newAdminId = Roles.insert({
      name: "superAdmin",
      name_zh: "超级管理员",
      createdAt: new Date(),
      weight: 0,
      deletable: false,
      editable: false,
      recordAccess: {
        read: [],
        edit: [],
        remove: [],
      },
      accesses: {
        isSuper: true,
        users: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        products: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        orders: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        coupons: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        cars: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        agencies: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        statics: {
          read: true,
          edit: true,
          remove: true,
          add: true,
        },
        role_assign: {
          admin: true,
          superAdmin: false,
        },
        users: [],
      }
    });
    Roles.update(newAdminId, {
      $set: {
        recordAccess: {
          read: [newAdminId],
          edit: [newAdminId],
          remove: [],
        },
      }
    });

  }

  let users = Meteor.users.find({username: "superAdmin"});
  let newUserId = null;
  if (users.count() === 0) {
    newUserId =   Accounts.createUser({
          username: "superAdmin",
          password: "superAdmin2017best",
        });

    console.log("超级管理员", newUserId);
    Meteor.users.update(newUserId,{
      $set: {
        roleId: newAdminId
      }
    }),
    Roles.update(newAdminId, {
      $set: {
        users: [newUserId]
      }
    });

  }

  return 1;
}
