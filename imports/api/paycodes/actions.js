import { Meteor } from 'meteor/meteor';
import {Orders} from '/imports/api/orders/orders.js'
import {Cards} from '/imports/api/cards/cards.js'
import {Coupons} from '/imports/api/coupons/coupons.js'
import {Balances} from '/imports/api/balances/balances.js'
import {BalanceIncomes} from '/imports/api/balances/balance_incomes.js'


import {　findSuperAgency, becomeAgency, findAgency　}　from '/imports/api/agencies/actions.js';

export function payOut(){

}

export function bindCard(order){
  //绑卡,暂时只考虑一张卡的情况
  let card = Cards.findOne({_id: order.productId});
  let sellOutCount = card.sellOutCount;
  if (sellOutCount == undefined) {
    sellOutCount = 0;
  }
  sellOutCount++;
  Cards.update(card._id, {
    $set:{
      sellOutCount
    }
  })
  console.log(card);
  if (Meteor.user().cards == undefined ) {
    console.log("1");
    Meteor.users.update(Meteor.userId(), {
      $set: {
        cards: [{
          cardId: card._id,
          buyTime: new Date(),
          cardName: card.name,
          cardTitle: card.slogan,
          description: card.description,
          overtime: card.overtime,
        }]
      }
    });
  }
  if (Meteor.user().cards != undefined ) {
    console.log("1");
    Meteor.users.update(Meteor.userId(), {
      $set: {
        cards: [{
          cardId: card._id,
          buyTime: new Date(),
          cardName: card.name,
          cardTitle: card.slogan,
          description: card.description,
          overtime: card.overtime,
          intro:card.intro,
        }]
      }
    });
  }
}

export function giveOutTheCoupon(){
  //送券
  let coupons = Coupons.find({cardCount: {$gt: '0'}});
  let user_coupons = Meteor.user().coupons;
  if (user_coupons == undefined) {
    user_coupons = [];
  }
  coupons.forEach((coupon) => {
      user_coupons.push({
        couponId: coupon._id,
        content: coupon.content,
        type: coupon.type,
        gotTime: new Date(),
        count: coupon.cardCount
      });
  });
  Meteor.users.update(Meteor.userId(), {
    $set: {
      coupons: user_coupons
    }
  });

}
export function giveMoneyToAgency(agency, money){


  let user = Meteor.users.findOne({"_id": agency.userId});
  console.log(user);
  let balance = Balances.findOne({userId: user._id});
  console.log(balance);
  if (balance == undefined) {
    return Balances.insert({
      userId: user._id,
      amount: money,
      createdAt: new Date()
    });
  }
  let update_balance = function(amount){
    return Balances.update(balance._id,{
      $set: {

        amount: amount,
      }
    });
  }
  let amount = balance.amount;
  if (amount == undefined) {
    return update_balance(money)
  }
  amount　=　parseInt(amount) + parseInt(money);

  return update_balance(amount);
}

//记录收入

export function incomeRecordToAgency(amount, agency, fromAgencyId, reasonType){
  let user = Meteor.users.findOne({_id: agency.userId});
  let balance = Balances.findOne({userId: user._id});
  if (reasonType == "agencyGive") {

    BalanceIncomes.insert({
      reasonType,
      agency: fromAgencyId,
      balanceId: balance._id,
      userId: user._id,
      amount,

      text: "分销收入",
      createdAt: new Date()

    });
  }

}

//记录支出

export function chargeRecordToAgency(amount, agency, reasonType){
  if (reasonType == "withdraw") {
    BalanceCharges.insert({
      reasonType,
      agency: fromAgencyId,
      balanceId: balance._id,
      userId: user._id,
      amount,

      text: "提现金额",
      createdAt: new Date()

    });
  }
}

export function afterCardPaySuccess(order,fromId){
  //若是订单是买卡类型的，则绑定卡片，并且提供相应优惠券赠送, fromId为Session
  bindCard(order);
  //送券
  giveOutTheCoupon();
  //获取上一个节点

  let superAgency = findSuperAgency(order.productId, fromId);
  //获取上上个节点
  let superSuperAgency = findAgency(superAgency.superAgencyId);

  //成为节点


  let meAgencyId = becomeAgency(order.productId, 1, superAgency._id, Meteor.userId(), false, -1);

  //开始给钱
  //给钱给上个节点
  giveMoneyToAgency(superAgency, 3880);

  //记录这次给钱
  incomeRecordToAgency(3880, superAgency, meAgencyId, "agencyGive");

  //给钱给上上个节点;
  giveMoneyToAgency(superSuperAgency, 1280);

  //记录这次给钱
  incomeRecordToAgency(1280, superSuperAgency, meAgencyId, "agencyGive");






}
