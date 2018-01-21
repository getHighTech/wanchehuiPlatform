
import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';
import { BalanceIncomes } from '/imports/api/balances/balance_incomes.js';
import { checkAgencies } from '/imports/api/agencies/checkAgencies.js'
import {buildSelfShop} from '/imports/api/shops/buildSelfShop.js'
import {buildBlackCard} from '/imports/api/products/buildBlackCard.js'
import {checkBalances} from '/imports/api/balances/checkBalances.js'
import {CheckRolesAccess, CheckACLAccess} from '/imports/core/accesses.js'
import { Roles } from '/imports/api/roles/roles.js';
import { Shops } from '/imports/api/shops/shops.js';
import { Products } from '/imports/api/products/products.js';
import { Tags } from '/imports/api/tags/tags.js';

Meteor.startup(() => {
  // checkAgencies();
  // buildSelfShop();
  //建立自营店铺， 并指认wanchehui为店铺管理员
  // checkBalances();
  // 测试用户模块权限

  prebuildAdmin();//建立超级管理员
  buildBlackCard();//建立黑卡
  // buildBlackCard();//建立黑卡
  // Tags.remove({});
  // Products.remove({});
  // Roles.remove({});
  // Shops.remove({});
  // buildBlackCard();//建立黑卡



});
