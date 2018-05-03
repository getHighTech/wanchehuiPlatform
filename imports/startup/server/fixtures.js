
import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';
import { BalanceIncomes } from '/imports/api/balances/balance_incomes.js';
import { checkAgencies } from '/imports/api/agencies/checkAgencies.js'
import {buildSelfShop} from '/imports/api/shops/buildSelfShop.js'
import {buildBlackCard} from '/imports/api/products/buildBlackCard.js'
import {checkBalances} from '/imports/api/balances/checkBalances.js'
import {CheckRolesAccess, CheckACLAccess} from '/imports/core/accesses.js'
import { Roles } from '/imports/api/roles/roles.js';
import { UserRoles } from '/imports/api/user_roles/user_roles.js';
import { Shops } from '/imports/api/shops/shops.js';
import { Products } from '/imports/api/products/products.js';
import { ProductOwners } from '/imports/api/product_owners/product_owners.js';
import { Tags } from '/imports/api/tags/tags.js';
import { Orders } from '/imports/api/orders/orders.js';
import { newProuct } from '../../core/new_product';

Meteor.startup(() => {
  // checkAgencies();
  
  // //建立自营店铺， 并指认wanchehui为店铺管理员
  // checkBalances();
  // // 测试用户模块权限
  
  
  // Meteor.users.remove({username: "superAdmin"});
  // Tags.remove({});
  // Products.remove({});
  // Roles.remove({});
  // UserRoles.remove({});
  // ProductOwners.remove({});
  // Shops.remove({});
  // prebuildAdmin();//建立超级管理员
  // buildSelfShop();
  // buildBlackCard();//建立黑卡
  
  // let tags = ["4s保养", "喷漆", "油卡", "机油超市", "新车"];
  // for (var i = 0; i < tags.length; i++) {
  //   if (Tags.find({name: tags[i]}).count() === 0) {
  //     Tags.insert({
  //       name: tags[i],
  //       isHome: true,
  //       createdAt: new Date()
  //     });
  //   }

  // }
  // for (var i = 0; i < 5; i++) {
  //   if (Shops.findOne({name: "测试店铺"+i})) {
  //     continue;
  //   }
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
  //     let product = Products.findOne({name_zh: "测试商品"+j.toString()+i.toString() });


  //     if (product) {
  //       continue;
  //     }
  //     let params = {

  //       isSale: true,

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
  //     let productId = newProuct
  //     (
  //       false,
  //       "nobody"+i,
  //       "测试产品角色"+i,
  //       params,
  //       "测试",
  //       ["4s保养", "喷漆", "油卡", "机油超市", "新车"],
  //     );
  //     product = Products.findOne({_id: productId});
  //     let isThereMemberPermission = false;
  //     for (var i = 0; i < product.acl.buy.roles.length; i++) {
  //       if (product.acl.buy.roles[i]=="blackcard_holder") {
  //         isThereMemberPermission = true;
  //       }

  //     }
  //     console.log('是否有黑卡权限', isThereMemberPermission);
  //     if (!isThereMemberPermission) {
  //       let acl = product.acl;
  //       acl.buy.roles.push('blackcard_holder');
  //       Products.update(product._id, {
  //         $set: {
  //           acl
  //         }
  //       })
  //     }
  //   }
  //   let shopIds = [];
  //   let productIds = [];
  //   if (tag) {
  //     shopIds = tag.shopIds;
  //     productIds = tag.productIds;
  //   }else{
  //     shopIds.push(shopId);
  //     productIds.push(product._id)
  //   }

  //   Tags.update(tag._id, {
  //     $set: {
  //       shopIds,
  //       productIds,
  //       updatedAt: new Date()
  //     }
  //   })


  // };  
  // ////循环加入测试店铺结束// 开始绑定黑卡和用户
  // let product = Products.findOne({name_zh: "万人车汇黑卡"});
  // let roleName = product.roleName;
  // console.log(roleName);
  // let role = Roles.findOne({name: roleName+"_holder"});
  // console.log(role);
  // Meteor.users.find({cards: {$exists: true}}).forEach(user=>{
  //   if(user.cards === null){
  //     console.log('此用户已经退卡了');
  //   }else{

  //     if(!ProductOwners.findOne({userId: user._id})){
  //       ProductOwners.insert({
  //         productId: product._id,
  //         userId: user._id,
  //         createdAt: new Date(),
  //       });
  //     }
  //     if(!UserRoles.findOne({userId: user._id})){
  //       console.log('此用户没有取得黑卡角色，正在绑定．．．');
  //       UserRoles.insert({
  //         roleName: role.name,
  //         userId: user._id,
  //         roleId: role._id,
  //         createdAt: new Date()
  //       })
  //     }else{
  //       console.log('此用户已经有角色了');
  //     }
  //   }
  // });
  //     let shop = Shops.findOne({name: "万人车汇自营店"});

  //       let params = {

  //       isSale: true,

  //       name_zh: "VIRIDI",
  //       name: "VIRIDI",
  //       price: 1,
  //       description: '驾驶员福音，超强德国进口缓释涂露',
  //       descriptionImg: 'https://wanchehui.oss-cn-qingdao.aliyuncs.com/viridi/1930443389.jpg',
  //       brief: '驾驶员福音，超强德国进口缓释涂露',
  //       images:
  //         [
  //           'https://wanchehui.oss-cn-qingdao.aliyuncs.com/viridi/583542866.jpg',
  //           'https://wanchehui.oss-cn-qingdao.aliyuncs.com/viridi/613049835.jpg',
  //           'https://wanchehui.oss-cn-qingdao.aliyuncs.com/viridi/1136468872.jpg'

  //         ],
  //       cover: 'https://wanchehui.oss-cn-qingdao.aliyuncs.com/viridi/1136468872.jpg',
  //       shopId: shop._id,
  //       createdByUserId: null,
  //       properties: [],
  //       recommendLevel: 0,
  //       specifications: [],//eg:[{"red": 100000, "red & heavy": 1500000}]
  //       endPrice: 1, //最终价格
  //       curency: 'cny', //cny
  //       agencyLevelCount: 2,//eg: 2
  //       agencyLevelPrices: [1000, 100]
  //     }
  //     let acl={
  //       buy: {
  //         roles: ['blackcard_holder']
  //       }
  //     }
  //     let rlt = newProuct(
  //       false, null, null, params, 
  //       ["保健品"], ["保健", "进口", "会员专区"], acl
  //     );
  //     console.log(rlt);
  //     let card = Products.findOne({name_zh: "万人车汇黑卡"});
  //     Products.update(card._id, {
  //       $set: {
  //         description: '<big><b>权益介绍</b></big><b><p style="text-align:left">网约车服务咨询：</p></b>官方合作伙伴，掌握一手政策消息。依托万车汇俱乐部，聆听您需求，随时为您服务。<b><p style="text-align:left">会员分享：</p></b>线下小班聚会，人气导师坐镇，明星师傅私密分享，面对面互动指导，搞定跑单业务。<b><p style="text-align:left">福利优惠：</p></b>尊享万车汇俱乐部及联盟商家汽车服务最低价格优惠，产品服务特惠不定期更新。<style type="text/css">table.altrowstable {font-family: verdana,arial,sans-serif;font-size:13px;border-collapse: collapse;}table.altrowstable th {color:#ffffff;background-color: rgb(81, 130, 187);text-align:center;border-width: 2px;border-style: solid;border-color:#ffffff;}table.altrowstable td {color:#333333;text-align:center;border-width: 2px;border-style: solid;border-color: #ffffff;}table.altrowstable tr:nth-child(odd) {background: #FFFFFF}table.altrowstable tr:nth-child(even) {background: #F0F0F0}</style><table class="centered  bordered altrowstable"><tr><th colspan="2">养车支出项</th><th>频次</th><th>市场价</th><th colspan="2">万车汇黑卡会员价</th></tr><tr><td rowspan="4">保养<br/>（换机油+机滤+工时+4L机油）</td><td rowspan="2">快车</td><td rowspan="2">两月3次<br/>一年18次</td><td>单次：200~220元</td><td>单次：140元</td><td rowspan="2">一年省<b style="color:red">1080+</b>元</td></tr><tr><td>一年：3600~3960元</td><td>一年：2520元</td></tr><tr><td rowspan="2">专车<br/>（20万以下）</td><td rowspan="2">两月3次<br/>一年18次</td><td>单次：363~414元</td><td>单次：220元</td><td rowspan="2">一年省<b style="color:red">2574+</b>元</td></tr><tr><td>一年：6534~7452元</td><td>一年：3960元</td></tr><tr><td rowspan="4">洗车</td><td rowspan="2">快车</td><td rowspan="2">一月3次<br/>一年36次</td><td>单次：25~35元</td><td>单次：15元</td><td rowspan="2">一年省<b style="color:red">380+</b>元</td></tr><tr><td>一年：900~1260元</td><td>一年：520元</td></tr><tr><td rowspan="2">专车</td><td rowspan="2">一月4次<br/>一年48次</td><td>单次：25~35元</td><td>单次：15元</td><td rowspan="2">一年省<b style="color:red">480+</b>元</td></tr><tr><td>一年：1200~1680元</td><td>一年：720元</td></tr><tr><td rowspan="2">喷漆</td><td>快车&优享</td><td>一年2次</td><td>400元/面</td><td>220元/面</td><td>一年省<b style="color:red">360+</b>元</td></tr><tr><td>专车<br/>（20万以下）</td><td>一年2次</td><td>600元/面</td><td>300元/面</td><td>一年省<b style="color:red">600+</b>元</td></tr></table><big><b>万车汇会员黑卡</b></big><p><b style="color:red">365</b>天，每天<b style="color:red">1</b>元，全年至少省<b style="color:red">3000+</b>'
  //       }
  //     });
  //     console.log("更改每个订单的productId");

  //     Orders.find().forEach(order => {
  //       Orders.update(order._id, {
  //         $set: {
  //           productIds: [card._id],
  //           userId: order.createdBy
  //         }
  //       })
  //     })
      
  //     console.log("为每个卡片持有者绑定其车牌");
      
  //     ProductOwners.find().forEach(owner=>{
  //         console.log("owner get");
          
  //         let order = Orders.findOne({createdBy: owner.userId, status: "paid"});
  //         let carNumber = null
  //         if(order){
  //           carNumber = order.carNumber;
  //           if(!carNumber){
  //             carNumber =order.carnumber;
  //           }
  //           if(!carNumber){
  //             carNumber =order.realNote.carNumber;
  //           }
  //           if(!carNumber){
  //             carNumber = order.realNote.carnumber;
  //           }
            
  //         }else{
  //           carNumber = "川A12345";
  //           let user = Meteor.users.findOne({_id: owner.userId});
  //           let mobile = null;
            
  //           if(user.profile){
  //             mobile = user.profile.mobile;
  //           }
  //           Orders.insert({  
  //             "type" : "card", 
  //             "name" : user.username, 
  //             "mobile" : mobile, 
  //             "products" : [{id: card._id, count: 1}], 
  //             "price" : "36500",  
  //             "status" : "paid", 
  //             "shopName": shop.name,
  //             "shopId": shop._id,
  //             "shopAdress": shop.address,
  //             "shopCover": shop.cover,
  //             "userId": owner.userId,
  //             "createdAt" : new Date() 
  //           }
  //         )
  //         }

  //         ProductOwners.update(owner._id, {
  //           $set: {
  //             additional: {
  //               carNumber 
  //             }
  //           }
  //         })
  //     });

  //     console.log("end of script");
      // Products.find({}).forEach(product => {
      //   if(!product.acl.copy){
      //     Products.update(product._id, {
      //       $set: {
      //         "acl.copy": {
      //           roles: ['blackcard_holder'],
      //           users: []
      //         }
      //       }
      //     })
      //   }
      //   console.log(product.acl, product._id);
        
      // });

});
