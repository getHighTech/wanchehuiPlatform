// Import server startup through a single index entry point
import { Meteor } from 'meteor/meteor';
import {Orders} from '/imports/api/orders/orders.js'
import {Cards} from '/imports/api/cards/cards.js'
import {Agencies} from '/imports/api/agencies/agencies.js'
import {Coupons} from '/imports/api/coupons/coupons.js'
import {Balances} from '/imports/api/balances/balances.js'
import {BalanceIncomes} from '/imports/api/balances/balance_incomes.js'
import {BalanceCharges} from '/imports/api/balances/balance_charges.js'
import {Crypto} from 'crypto';
import {bindCard, giveOutTheCoupon, afterCardPaySuccess} from '/imports/api/paycodes/actions.js'

//各种服务端响应
HTTP.methods({
    "getone": {
        get: function(){
            return "heloo"
        }
    },
   'wch/payback': {
     post: function(data) {
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

       let superAgencyId = data.attach.super_agency_id;
       let order = Orders.findOne({_id: orderId});
       if (order == undefined) {
         return "ORDERID IS MISSING";
         console.log("ORDERID IS MISSING");
       }
       let cardToGive = Cards.findOne({_id: order.productId});
       if (status == "failed") {
         return "WECHAT PAY FAILED"
         console.log("WECHAT PAY FAILED");
       }
       if (status == "canceled") {
         return "WECHAT PAY CANCELED";
         console.log("WECHAT PAY CANCELED");
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



     }
   },
   'order/refund': {
     post: function(data){
       let userId = null;
       let orderId = null;
       if (data.data === undefined) {
         return "DATA LOSE";
       }
       if (data.data.user_id !== undefined) {
         userId = data.data.user_id;
       }
       if (data.data.order_id !== undefined) {
         orderId = data.data.order_id;
       }

       let user = Meteor.users.findOne({_id: userId});

       Meteor.users.update(userId, {
         $set: {
           cards: null,
         }
       });



       let agency = Agencies.findOne({userId});

       if (agency == undefined) {
         return "USER HAS NO AGENCY";
       }
       let superAgency = Agencies.findOne({_id: agency.superAgencyId});
       if (superAgency == undefined ) {
         return "USER HAS NO SUPERAGENCY";
       }

       let superUser = Meteor.users.findOne({_id: superAgency.userId});
       let superBalance = Balances.findOne({userId: superUser._id});

       let superBalanceAmount = superBalance.amount;
       BalanceCharges.insert({
         balanceId: superBalance._id,
         userId: superUser._id,
         text: user.username+"已经退卡",
         money: 3880,
         reasonType:'refunded',
         createdAt:new Date()
       });

       superBalanceAmount = superBalanceAmount - 3880;

       Balances.update(superBalance._id, {
         $set: {
           amount: superBalanceAmount,
         }
       });
       //其上级佣金已经退回
       let superSuperAgency = Agencies.findOne({_id: superAgency.superAgencyId});

       if (superSuperAgency  === undefined) {
         return "SUPER SUPER USER IS NOT EXITSTS";
       }

       let superSuperUser = Meteor.users.findOne({_id: superSuperAgency.userId});
       let superSuperBalance = Balances.findOne({userId: superSuperUser._id});


       let superSuperBalanceAmount = superSuperBalance.amount;

       BalanceCharges.insert({
         balanceId: superSuperBalance._id,
         userId: superSuperUser._id,
         text: user.username+"已经退卡",
         money: 1280,
         reasonType:'refunded',
         createdAt:new Date()
       });

       superSuperBalanceAmount = superSuperBalanceAmount - 1280;
       Balances.update(superSuperBalance._id, {
         $set: {
           amount: superSuperBalanceAmount,
         }
       });

        //其上上级佣金已经退回

        return "ALL USERS RELATED LOSE THEIR MONEY";







     }
   }
 });

 //webhook,收到beecloud的支付成功的消息，并且处理
 HTTP.methods({
    'payback': {
      post: function(data) {
          let user = Meteor.users.findOne({_id: data.optional.userid});
          // console.log(user);
          let order = Orders.findOne({_id: data.optional.wanchehuiorderid});
          if (order.status == 'paid') {
            if (order.type === 'card') {
              //若是订单是买卡类型的，则绑定卡片，并且提供相应优惠券赠送



              afterCardPaySuccess(order, data.optional.fromId);



            }//end of if type == card
            return 'SUCCESS'
          }
          if (order.status == 'unpaid') {
            if (order == undefined) {
              return '此页面已经过期，请返回刷新重试';
            }
            if (order.type === 'card') {
              //若是订单是买卡类型的，则绑定卡片，并且提供相应优惠券赠送



              afterCardPaySuccess(order, data.optional.fromId);



            }//end of if type == card
            Orders.update(order._id, {
              $set: {status: 'paid'}
            });
            console.log('最终这个用户会变成',Meteor.users.findOne({_id: data.optional.userid}));
            return 'SUCCESS'
          }//if status == unpaid

          return 'FAIL'

      },

    },
    'showpayback': {
      get: function(data) {
        return HTTP.call('post', 'http://localhost:3000/payback', {
          data: { some: 'json', stuff: 1 }}
        );
      }
    }
  });
