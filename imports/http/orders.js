import { Meteor } from 'meteor/meteor';

import {Orders} from '/imports/api/orders/orders.js';
import {Agencies} from '/imports/api/agencies/agencies.js'
import {Shops} from '/imports/api/shops/shops.js'
import {Balances} from '/imports/api/balances/balances.js'
import {BalanceIncomes} from '/imports/api/balances/balance_incomes.js'
import {ProductOwners} from '/imports/api/product_owners/product_owners.js';
import { updateShopOrders, ShopOrders } from '../api/apps/apps';
import { Roles } from '/imports/api/roles/roles.js';
import { UserRoles } from '/imports/api/user_roles/user_roles.js';

let GorderId = null;

HTTP.methods({
  
   '/api/v2/order/give': {
     get: function(){
       return {
         paid1: ShopOrders.findOne({orderId}),

       }
     },
     post: function(data){
       let status = "failed";
       let wechatOrderId = null;
       let originOrderId = null;
       if (data.ext != undefined) {
         transactionId = data.ext.transaction_id;
         tradeId = data.ext.trade_id;
         payMode = data.ext.pay_mode;

       }
       if (data.attach == undefined) {
         return data;
       }else{
         status = "success"
       }
       let orderId = data.attach.out_trade_no;
       GorderId = orderId;
       let superAgencyId = data.attach.super_agency_id;
       let order = Orders.findOne({_id: orderId});
        if (status == "failed") {
          return "WECHAT PAY FAILED"
          }
        if (status == "canceled") {
          return "WECHAT PAY CANCELED";
          } 
        if (status == "success") {
        //改变订单状态
        if (order.status == "paid") {
          return "ORDER IS ALREADY DEALED"
          console.log("ORDER IS ALREADY DEALED");
        }
        Orders.update(orderId,{
          $set: {
            status: "paid",
            transactionId,
            tradeId,//存入订单和微信订单的对应
            payMode,//存入支付渠道
          }
        })
        updateShopOrders(orderId, {
          status: "paid",
        })
        console.log("paid1", ShopOrders.findOne({orderId}));
        console.log("paid1", Orders.findOne({_id: orderId}));
        
        
       if(data.attach.version){
         //2.0开始处理已经支付的订单
         let products = order.products;
         let productCounts  = order.productCounts;
         //找出各个商品属于的店长
         for (let index = 0; index < products.length; index++) {
           const product = products[index];
           let shop = Shops.findOne({_id: product.shopId});
           let owner = null;
           if(shop.acl.own.users){
             owner = shop.acl.own.users[0]
           }
           if(!owner){
            continue;
           }else{
             //给店长钱
             let moneyToGive = product.agencyLevelPrices[0]*productCounts[product._id];
             let balance = Balances.find({userId: owner});
              BalanceIncomes.insert({
                reasonType : "agencyGive",
                agency: order.userId,
                balanceId: balance._id,
                userId: owner,
                amount: moneyToGive,
                text: "零售利润",
                createdAt: new Date()
              });
              let totalAmount = balance.amount;
              Balances.update(balance._id, {
                $set: {
                  amount: totalAmount+moneyToGive
                }
              });
              let wanchehui = Meteor.users.find({username: "wanchehui"});
              //测试是否真的到帐了
              console.log("owners_incomes", BalanceIncomes.findOne({userId: wanchehui._id}));
              console.log("balances", Balances.findOne({userId: wanchehui._id}));
              
              
              //给完钱了,
              //给渠道money ===================
              //加入凯歌算法
              // let shop = Shops.findOne({_id: product.shopId});
              // let channel = kaigeAlg(shop);
              // let channelShop = Shops.findOne({channel});
              // let channelOwner = channelShop.acl.own.users[0];
              //give chanel owner product.agencyLevelPrices[1]
              // if(product.shopId)
              //==============================
              //发货并且声明货品拥有人
              let additional = {
                //买了卡的需要绑定车牌号

              }

              if(product.name === "wanchehui black card"){
                additional = {
                  cardNumber: order.contact.cardNumber
                }
              }
              let productOwner = ProductOwners.insert({
                productId: product._id,
                userId: order.userId,
                createdAt: new Date(),
                additional
              });
              let role = Roles.findOne({name: product.roleName+"_holder"});
              if(!UserRoles.findOne({userId: order.userId})){
                console.log('此用户没有取得黑卡角色，正在绑定．．．');
                UserRoles.insert({
                  roleName: role.name,
                  userId: order.userId,
                  roleId: role._id,
                  createdAt: new Date()
                })
              }else{
                console.log('此用户已经有角色了');
              }

           }
         }
         console.log("paid2", ShopOrders.findOne({orderId}));
         console.log("paid2", Orders.findOne({_id: orderId}));
         console.log("userRole", UserRoles.findOne({userId: order.userId}));
         return status;
       }
       //兼容1.0=======================================================
       if (order == undefined) {
         return "ORDERID IS MISSING";
         console.log("ORDERID IS MISSING");
       }
       let cardToGive = Cards.findOne({_id: order.productId});
       if (status == "failed") {
         return "WECHAT PAY FAILED"
       }
       if (status == "canceled") {
         return "WECHAT PAY CANCELED";
       }
       if (status == "success") {
         //改变订单状态
         if (order.status == "paid") {
           return "ORDER IS ALREADY DEALED"
         }
         Orders.update(orderId,{
           $set: {
             status: "paid",
             transactionId,
             tradeId,//存入订单和微信订单的对应
             payMode,//存入支付渠道
           }
         })
         //给卡
         Meteor.users.update(order.createdBy, {
           $set: {
             cards: [{
               cardId: cardToGive._id,
               buyTime: new Date(),
               cardName: cardToGive.name,
               cardTitle: cardToGive.slogan,
               description: cardToGive.description,
               overtime: cardToGive.overtime,
             }]
           }
         });

         //建立上下级代理关系
        let fromAgencyId = Agencies.insert({
           productId: order.productId,
           superAgencyId: superAgencyId,
           isRoot: false,
           flag: -1,
           userId: order.createdBy,
           createdAt: new Date(),
         });


         //分润
          //给上级钱
        let buyer = Meteor.users.findOne({_id: order.createdBy});
         let superAgency = Agencies.findOne({_id: superAgencyId});
        if (superAgency == undefined) {
           giveOutTheCoupon(buyer);
           return "SUPER ANGENCY MISSING";
           console.log("SUPER ANGENCY MISSING");
         }
         let superUser = Meteor.users.findOne({_id: superAgency.userId});
         if (superUser === undefined) {
           return "SUPER USERS MISSING";
         }
         let superBalance = Balances.findOne({userId: superUser._id});

         let superBalanceId = null;
         if (superBalance == undefined) {
           superBalanceId = Balances.insert({
             userId: superUser._id,
             amount: 0,
             createdAt: new Date()
           });
           superBalance = Balances.findOne({_id: superBalanceId});

         }else{
           superBalanceId = superBalance._id;
         }
         let balanceIncomeId = BalanceIncomes.insert({
           reasonType: 'agencyGive',
           agency: fromAgencyId,
           balanceId: superBalanceId,
           userId: superUser._id,
           amount: 3880,
           text: "分享奖励",
           createdAt: new Date()

         });
         let oldAmount = superBalance.amount;
         let newAmount = parseInt(oldAmount) + 3880
         let balanceUpdateResult = Balances.update(superBalance._id, {
           $set: {
             amount: newAmount
           }
         });

         if (balanceUpdateResult < 1) {
           return "GIVE MONEY TO SUPER FAILED";
         }

          //给上上级钱
          let superSuperAgency = Agencies.findOne({_id: superAgency.superAgencyId});
          let superSuperUser = Meteor.users.findOne({_id: superSuperAgency.userId});
          let superSuperBalance = Balances.findOne({userId: superSuperUser._id});
          let superSuperBalanceId = null
          if (superSuperBalance == undefined) {

            superSuperBalanceId = Balances.insert({
              userId: superUser._id,
              amount: 0,
              createdAt: new Date()
            });
            superSuperBalance = Balances.findOne({_id: superSuperBalanceId});

          }else{
            superSuperBalanceId = superSuperBalance._id;
          }
          BalanceIncomes.insert({
            reasonType: 'agencyGive',
            agency: fromAgencyId,
            balanceId: superSuperBalanceId,
            userId: superSuperUser._id,
            amount: 1280,
            text: "分享奖励",
            createdAt: new Date()

          });

          oldAmount = superSuperBalance.amount;
          newAmount = parseInt(oldAmount) + 1280
          balanceUpdateResult = Balances.update(superSuperBalance._id, {
            $set: {
              amount: newAmount
            }
          });
          if (balanceUpdateResult < 1) {
            return "GIVE MONEY TO SUPER SUPER FAILED";
          }


         //送券

         return giveOutTheCoupon(buyer);



          }//if success status
      //兼容1。0==============================================================
      }
    }
  }
  
 });
