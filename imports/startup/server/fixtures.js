
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
import { newProuct } from '../../core/new_product';

Meteor.startup(() => {
  // checkAgencies();
  // buildSelfShop();
  //建立自营店铺， 并指认wanchehui为店铺管理员
  // checkBalances();
  // 测试用户模块权限

  // prebuildAdmin();//建立超级管理员
  // buildBlackCard();//建立黑卡
  // buildBlackCard();//建立黑卡
  // Tags.remove({});
  // Products.remove({});
  // Roles.remove({});
  // Shops.remove({});
  // buildBlackCard();//建立黑卡
  // Tags.remove({});
  // Products.remove({});
  // Roles.remove({});
  // Shops.remove({});
  // buildBlackCard();//建立黑卡
  //生成首页的热门标签以及测试店面
  // let tags = ["4s保养", "喷漆", "油卡", "机油超市", "新车"];
  // for (var i = 0; i < tags.length; i++) {
  //   if (Tags.find({name: tags[i]}).count() === 0) {
  //     Tags.insert({
  //       name: tags[i],
  //       isHome: true,
  //       createdAt: new Date()
  //     });
  //
  //   }
  //
  // }
  // for (var i = 0; i < 5; i++) {
  //   let shopId = Shops.insert({
  //     name: "测试店铺"+i,
  //     phone: "13012121212",
  //     pictures: [],
  //     description: '这是万人汇测试店',
  //     tags: ["4S保养", "测试"],
  //     cover: 'http://wanchehui.oss-cn-qingdao.aliyuncs.com/cover.png',
  //     address:'成都滴滴车主俱乐部',
  //     city: "成都市",
  //     lntAndLat:[104.115038, 30.593608],
  //     status: true,
  //     createdAt: new Date(),
  //     acl: {
  //       own: {
  //         roles: ["shop_owner"],
  //         users: [],
  //       },
  //       read: {
  //         roles: ['nobody', 'login_user']
  //       },
  //       write: {
  //         roles: ["shop_owner","shop_manager"],
  //         users: [],
  //       }
  //     }
  //   });
  //   let tag = Tags.findOne({name: "4s保养"});
  //   for (var j = 0; j < 5; j++) {
  //     let params = {
  //
  //       isSale: true,
  //
  //       name_zh: "测试商品"+j.toString()+i.toString(),
  //       name: "test product"+j.toString()+i.toString(),
  //       price: 1,
  //       description: '测试商品',
  //       brief: '测试商品',
  //       images:['http://localhost:3000/static/media/one.933843c7.jpg'],
  //       cover: 'http://localhost:3000/static/media/one.933843c7.jpg',
  //       shopId: shopId,
  //       createdByUserId: null,
  //       properties: [],
  //       recommendLevel: 0,
  //       specifications: [],//eg:[{"red": 100000, "red & heavy": 1500000}]
  //       endPrice: 1, //最终价格
  //       curency: 'cny', //cny
  //       agencyLevelCount: 2,//eg: 2
  //       agencyLevelPrices: [3880, 1280]
  //     }
  //     newProuct
  //     (
  //       false,
  //       "nobody"+i,
  //       params,
  //       "测试",
  //       ["4s保养", "喷漆", "油卡", "机油超市", "新车"],
  //     )
  //   }
  //   let shopIds = []
  //   if (tag) {
  //     shopIds = tag.shopIds;
  //   }else{
  //     shopIds.push(shopId);
  //
  //   }
  //
  //   Tags.update(tag._id, {
  //     $set: {
  //       shopIds,
  //       updatedAt: new Date()
  //     }
  //   })
  //
  //
  // }



});
