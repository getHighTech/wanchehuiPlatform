import { Roles } from '../../api/roles/roles.js';
//这里预设好所有的用户及其角色
export function prebuildAdmin(){
  let roles = Roles.find({name: "superAdmin"});
  let newAdminId = null;
  if (roles.count()==0) {
    newAdminId = Roles.insert({
      name: "superAdmin",
      name_zh: "超级管理员",
      createdAt: new Date(),
      weight: 0,
      deletable: false,
      editable: false,
      accesses: {
        isSuper: true,
        users: true,
        products: true,
        orders: true,
        coupons: true,
        cars: true,
        agencies: true,
        statics: true,
      }
    });
    let users = Meteor.users.find({username: "superAdmin"});
    let newUserId = null;
    if (users.count()==0) {
      newUserId =   Accounts.createUser({
            username: "superAdmin",
            password: "superAdmin2017best",
          });
    }
  }
}
