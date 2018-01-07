
import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';
import { BalanceIncomes } from '/imports/api/balances/balance_incomes.js';
import { checkAgencies } from '/imports/api/agencies/checkAgencies.js'
import buildSelfShop from '/imports/api/shops/buildSelfShop.js'
import {checkBalances} from '/imports/api/balances/checkBalances.js'
import {CheckRolesAccess, CheckACLAccess} from '/imports/core/accesses.js'
import { Roles } from '/imports/api/roles/roles.js';
import { Shops } from '/imports/api/shops/shops.js';

Meteor.startup(() => {
  //delete roles;
  // checkAgencies();检查并且修复所有分销代理
  // buildSelfShop();
  //建立自营店铺， 并指认wanchehui为店铺管理员
  // checkBalances();
  // 测试用户模块权限
  // const test_roles1 = ['shop_owner'];
  // const test_roles2 = ['shop_owner', 'nobody', 'login_user'];
  // const test_roles3 = [];
  // const test_roles4 = ['black_card_holder', 'login_user'];
  // // let shop = Shops.findOne({_id: shopId});
  // let wanchehui = Meteor.users.findOne({username: 'wanchehui'});
  //
  // let superAdmin = Meteor.users.findOne({username: 'superAdmin'});
  // let yangzhiqiang = Meteor.users.findOne({username: '13128980333'});
  //
  //
  // let switchRolesToName = function(roles){
  //   let roleNames = [];
  //   Roles.find({_id: {$in: roles}}, {
  //     fields:
  //       {
  //         name: 1
  //       }
  //     }).forEach(role => {
  //       roleNames.push(role.name);
  //     })
  //   return roleNames;
  // }
  // let shop  = Shops.findOne({name: "万人车汇自营店"});
  // let yangRoleNames = switchRolesToName(yangzhiqiang.roles);
  // let rlt =  CheckACLAccess(yangRoleNames, yangzhiqiang._id, shop.acl, 'write')
  // let rlt2 =  CheckACLAccess(yangRoleNames, yangzhiqiang._id, shop.acl, 'own')
  // // let rlt = CheckRolesAccess(test_roles1, 'users', 'readable');
  // console.log(rlt2);
  // console.log(rlt);
  prebuildAdmin();

});
