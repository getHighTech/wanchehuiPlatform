
import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';
import { BalanceIncomes } from '/imports/api/balances/balance_incomes.js';
import { Balances } from '/imports/api/balances/balances.js';
import { BalanceCharges } from '/imports/api/balances/balance_charges.js';

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
import { AgencyRelation } from '/imports/api/agency_relation/agency_relation.js';

Meteor.startup(() => {



  let newroot = 20;

  for(var i = 0;i<newroot;i++){
    //创建20个新用户
    let user = Meteor.users.find({username:"wanchehuiuser"+i}).fetch()
    if (!user[0]) {
      Accounts.createUser({
           username: "wanchehuiuser"+i,
           password: "wanchehui2017best"+i,
         });
    }

  }

  // checkAgencies();
  //
  // //建立自营店铺， 并指认wanchehui为店铺管理员
  // checkBalances();
  // // 测试用户模块权限
  //

  // Meteor.users.remove({username: "superAdmin"});

  // Meteor.users.remove({username: "superAdmin"});

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
      //         },
      //       }
      //     })
      //   }
      //   if(!product.acl.buy){
      //     Products.update(product._id, {
      //       $set: {
      //         "acl.buy": {
      //           roles: ['login_user'],
      //           users: []
      //         },
      //       }
      //     })
      //   }
      //   console.log(product.acl, product._id);
      // });
      // let orderRmRlt = Orders.remove({totalAmount: {$exists: true}});
      // console.log(orderRmRlt);
      // Meteor.users.find().forEach(user => {
      //   Meteor.users.update(user._id, {
      //     $set: {
      //       fromApp: "wanrenchehui"
      //     }
      //   })
      // });
      // for(let i=1;i<=100;i++) {
      //   console.log(i)
      //   Accounts.createUser({
      //     username: "user"+i,
      //     password: "user"+i,
      //   })
      // }



      // 兼容万人车汇和鲜至的佣金账户
      // let user1 = Meteor.users.findOne({username:'小马过河'})
      // let user2 = Meteor.users.findOne({username:'前台李博'})
      // console.log('小马过河账户ID为：',user1._id)
      // console.log('前台李博账户ID为：',user2._id)
      // let users = Meteor.users.find({_id:{$nin:[user1._id,user2._id]},visited:{$exists: true}}).fetch()
      // console.log('登陆过鲜至的用户个数为:',users.length)

      // users.forEach(item => {
      //   if(item._id ==user1._id){
      //     console.log('小马过河账户剔除失败')
      //   }
      //   if(item._id ==user2._id){
      //     console.log('前台李博账户剔除失败')
      //   }
      //   let incomes = BalanceIncomes.find({userId:item._id}).fetch()
      //   incomes.forEach((income)=>{
      //     BalanceIncomes.update(income,{
      //       $set:{
      //         appName:"xianzhi"
      //       }
      //     },function(err,alt){
      //       if(!err){
      //         console.log('给用户收入加上APPNAME,用户名为：',item.username)
      //       }
      //     })
      //   })
      //   let blance = Balances.findOne({userId:item._id})
      //   Balances.update(blance,{
      //     $set:{
      //       appName:"xianzhi"
      //     }
      //   },function(err,alt){
      //     if(!err){
      //       console.log('给用户账户加上appName,用户名为：',item.username)
      //     }
      //   })
      // });
      // let maBlanceIncomes = BalanceIncomes.find({'userId':'znz5tYpY3EhCbKX4k'},{sort: {createdAt: -1},limit:20}).fetch()
      // let  maIncome = 0
      // maBlanceIncomes.forEach(item => {
      //   maIncome += item.amount
      //   console.log('单次收入为：',item.amount)
      //   console.log('总收入为：',maIncome)
      //   BalanceIncomes.update(item,{
      //     $set:{
      //       appName:"xianzhi"
      //     }
      //   },function(err,alt){
      //     if(!err){
      //       console.log('给马哥收入加上APPNAME')
      //     }
      //   })
      // });
      //  Balances.insert({
      //   userId: user1._id,
      //   amount: maIncome,
      //   createdAt: new Date(),
      //   appName:'xianzhi'
      // });
      // Balances.insert({
      //   userId: user2._id,
      //   amount: 0,
      //   createdAt: new Date(),
      //   appName:'xianzhi'
      // });

      // //

      // let user4 = Meteor.users.findOne({username:'13540844297'})
      // console.log('修复淋太提现NAN',user4._id)
      // let charges = BalanceCharges.find({userId:user4._id}).fetch()


      // charges.forEach(item => {
      //   BalanceCharges.update(item,{
      //     $set:{
      //       money:0
      //     }
      //   },function(err,alt){
      //     console.log('将提现记录修复为提现金额为0')
      //   })
      // });
      // let duanBlanceIncomes = BalanceIncomes.find({'userId':user4._id}).fetch()
      // let  duanIncome = 0
      // duanBlanceIncomes.forEach(item => {
      //   duanIncome += item.amount

      //   console.log('段单次收入为：',item.amount)
      //   console.log('段总收入为：',duanIncome)
      // });
      // let duanBlanceCharges = BalanceCharges.find({'userId':user4._id,appName:'xianzhi',status:'paid'}).fetch()
      // let  duanCharges = 0
      // duanBlanceCharges.forEach(item => {
      //     if(isNaN(item.money)){
      //       // console.log('NaN')
      //       item.money = 0
      //     }
      //     duanCharges += item.money
      //   console.log('段单次支出为：',item.money)
      //   console.log('段总支出为：',duanCharges)
      // });
      // let duanBlance = Balances.findOne({userId:user4._id})
      // let duanBlanceAmount = duanIncome - duanCharges
      // Balances.update(duanBlance,{
      //   $set:{
      //     amount: duanBlanceAmount
      //   }
      // });
});
