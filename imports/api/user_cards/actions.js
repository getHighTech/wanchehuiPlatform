import {Cards} from '../cards/cards.js';
import {UserCards} from './user_cards.js';
import {SysLogs} from '../sys_logs/sys_logs';
import {findOrCreateAgencyByUserId} from '../agencies/actions.js'


function reduceSuperMoneyCardId(userId){
  //扣除退卡用户上级以及上上级别的钱
  let agency = Agencies.findOne({userId});
  let superAgency = Agencies.findOne({superAgencyId: agency.superAgencyId});
  let superUser = Meteor.users.findOne({_id: superAgency.userId});
  let superBalance = Balances.findOne(superUser._id);
  BalanceCharges.insert({
    reasonType: 'refund',
    agency: agency._id,
    balanceId: superBalance._id,
    userId,
    money: 3880,
    text: "用户已经退卡",
    status: "paid",
    createdAt: new Date()

  });
  Balances.update(superBalance._id, {
    $set: {
      amount: superBalance.amount - 3880
    }
  });



}

export function deleteCardByUserId(userId){
  let user = Meteor.users.findOne({_id: userId});
  let user_card = UserCards.findOne({userId});
  if (user_card) {
    //系统日志
    UserCards.remove({_id: user_card._id});
  }else{
    SysLogs.insert({
      type: "数据结构缺失",
      text: "卡和人的关系不存在",
      level: 100,
      userId,
      note: "解绑人卡关系时，可以忽略",
      createdAt: new Date(),
    });
  }
  if (user.cards !== null || user.cards !== undefined) {
     Meteor.users.update(userId, {
      $set: {
        cards: null,
      }
    });
    return SysLogs.insert({
      type: "管理员日志",
      text: Meteor.user().username+"禁止了"+user.username+"的卡片",
      level: 99,
      note: "不稳定操作，开发应当避免，并寻找成因并优化",
      createdAt: new Date(),
    });

  }else{
    return "USER DONT HAS ANY CARDS";
  }

}

export function giveCardByUserId(userId){
  let card = Cards.findOne();
  if (card == undefined) {
    return "NOT CARDS AVILIBLE";
  }
  UserCards.insert({
    userId,
    cardId: card._id,
    createdAt: new Date(),
    orderId: null,
  });
  Meteor.users.update(userId, {
    $set: {
      cards: [card]
    }
  });
  let agency=findOrCreateAgencyByUserId(userId, card._id);
  let user = Meteor.users.findOne({_id: userId});
  SysLogs.insert({
    type: "管理员日志",
    text: Meteor.user().username+"给了"+user.username+"一张黑卡",
    level: 99,
    note: "不稳定操作，开发应当避免，并寻找成因并优化",
    createdAt: new Date(),
  });
  return agency;
}
