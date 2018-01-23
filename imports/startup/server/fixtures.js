
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
  //生成首页的热门标签以及测试店面
  let tags = ["4S保养", "喷漆", "油卡", "油卡充值", "机油超市", "新车"];
  for (var i = 0; i < tags.length; i++) {
    if (Tags.find({name: tags[i]}).count() === 0) {
      Tags.insert({
        name: tags[i],
        isHome: true,
      });
      
    }

  }
  for (var i = 0; i < 5; i++) {
    Shops.insert({
      name: "测试店铺"+i,
      phone: "13012121212",
      pictures: [],
      description: '这是万人车汇平台官方店',
      tags: ["4S保养", "测试"],
      cover: 'http://wanchehui.oss-cn-qingdao.aliyuncs.com/cover.png',
      address:'成都滴滴车主俱乐部',
      lntAndLat:[104.115038, 30.593608],
      status: true,
      createdAt: new Date(),
      acl: {
        own: {
          roles: ["shop_owner"],
          users: [],
        },
        read: {
          roles: ['nobody', 'login_user']
        },
        write: {
          roles: ["shop_owner","shop_manager"],
          users: [],
        }
      }
    });
  }



});
