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


HTTP.methods({
  
   '/v2/orders/give': {
     get: function(){
        let wanchehui = Meteor.users.find({username: "wanchehui"});
       let rlt = {
         paid1: ShopOrders.find({},{sort: {createdAt: -1}, limit: 1}).fetch(),
         paid2: Orders.find({},{sort: {createdAt: -1}, limit: 1}).fetch(),
         owners_incomes:  Balances.findOne({userId: wanchehui._id}),
         balances: Balances.findOne({userId: wanchehui._id}),
         userRole: UserRoles.find({},{sort: {createdAt: -1}, limit: 1})
       };
       var cache = [];
        let rltJson = JSON.stringify(rlt, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
        cache = null; 
        return rltJson;
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
        console.log("paid1", ShopOrders.find({}).fetch());
        console.log("paid1", Orders.findOne({_id: orderId}));
        
        
       if(data.attach.version){
         //2.0开始处理已经支付的订单
         let products = order.products;
         let productCounts  = order.productCounts;
         //找出各个商品属于的店长
         for (let index = 0; index < products.length; index++) {
           const product = products[index];
           let shop = Shops.findOne({_id: product.shopId});
           console.log("shop", shop);
           
           let owner = null;
           if(shop.acl.own.users){
             owner = shop.acl.own.users
           }
           if(!owner){
            continue;
           }else{
             //给店长钱
             let moneyToGive = product.agencyLevelPrices[0]*productCounts[product._id];
             let balance = Balances.findOne({userId: owner});
              let bii = BalanceIncomes.insert({
                reasonType : "agencyGive",
                agency: order.userId,
                balanceId: balance._id,
                userId: owner,
                amount: moneyToGive,
                text: "零售利润",
                createdAt: new Date()
              });
              let totalAmount = balance.amount;
              let amount = totalAmount+parseInt(moneyToGive, 10);
              console.log("cal amount ", amount);
              
              let bi = Balances.update(balance._id, {
                $set: {
                  amount
                }
              });

              console.log("bi", bi);
              
              let wanchehui = Meteor.users.findOne({username: "wanchehui"});
              //测试是否真的到帐了
              console.log('owner', owner);
              console.log('wancheui', wanchehui);
              console.log('oldB', Balances.findOne({userId: wanchehui._id}));
              console.log("owners_incomes", BalanceIncomes.findOne({_id: bii}));
              console.log("balances", Balances.findOne({_id: balance._id}));
              
              
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
                let role = Roles.findOne({name: product.roleName+"_holder"});
                console.log("Role", role);
                additional = {
                  cardNumber: order.contact.cardNumber
                }
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
              let productOwner = ProductOwners.insert({
                productId: product._id,
                userId: order.userId,
                createdAt: new Date(),
                additional
              });
              
              

           }
         }
        
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
