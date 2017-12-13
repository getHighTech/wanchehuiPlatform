import { Meteor } from 'meteor/meteor';
import { findAgencyById, MoveAgenciesFromOneUserToAnother} from '../agencies/actions.js';
import {giveCardByUserId} from '../user_cards/actions.js';
import {Orders} from "/imports/api/orders/orders.js";
import {UserCards} from "/imports/api/user_cards/user_cards.js";
import { Balances } from "/imports/api/balances/balances.js";
import { BalanceIncomes } from "/imports/api/balances/balance_incomes.js";
import { BalanceCharges } from "/imports/api/balances/balance_charges.js";
import { Devices } from "/imports/api/devices/devices.js";
import { Bankcards } from "/imports/api/bankcards/bankcards.js";
import { Messages } from "/imports/api/messages/messages.js";

export function allUsersMount(){
  return Meteor.users.find().count();
}

export function allCardUsersMount(){
  return Meteor.users.find({cards: {$exists: false},
    cards: {$not: {$in: [null]}}
  }).count();
}

export function chengduCardUsersMount(){
  return Orders.find({"status":"paid","area":"CHENGDU","type":"card"}).count();
}

export function beijingCardUsersMount(){
  return Orders.find({"status":"paid","area":"BEIJING","type":"card"}).count();
}

export function SalesOnTodayInBeiJing(){

}

export function findUserByUsername(username){
  let user = Meteor.users.findOne({"username": username});
  if (!user) {
    return "USER NOT FOUND";
  }
  return user;

}




export function findUserByMobile(mobile){
  return Meteor.users.findOne({"profile.mobile": mobile});
}

export function findUserById(id){
  return Meteor.users.findOne({_id: id});
}


export function createUserByUsernameAndMobile(username, mobile){
  let user =  Meteor.users.findOne({"profile.mobile": mobile});
  if (user == undefined) {
    let user_id =   Accounts.createUser({
          username: mobile,
          password: mobile,
        });
      Meteor.users.update(user_id,{
          $set: {
            "profile.mobile": mobile
          }
        });
    user = Meteor.users.findOne({_id: user_id});
  }
  return user;
}

export function giveCardAndCouponsToUser(userId){
  let user = Meteor.users.findOne({_id: userId});
  if (user == undefined) {
    return "USER NOT FOUND";
  }
  if (user.cards!==undefined && user.coupons !== undefined) {
    return "USER DATA ALREADY UPDATED"
  }
  return Meteor.users.update(userId, {
    $set: {
      "cards" :
        [
          {
            "cardId" : "Fky4pwxhcXZJrkdre", "buyTime" : new Date(),
            "cardName" : "万车汇黑卡", "cardTitle" : "VIP",
            "description" : "\n\n<big><b>权益介绍</b></big>\n\n<b><p style=\"text-align:left\">网约车服务咨询：</p ></b>\n\n官方合作伙伴，掌握一手政策消息。依托万车汇俱乐部，聆听您需求，随时为您服务。\n\n<b><p style=\"text-align:left\">会员分享：</p ></b>\n\n线下小班聚会，人气导师坐镇，明星师傅私密分享，面对面互动指导，搞定跑单业务。\n\n<b><p style=\"text-align:left\">福利优惠：</p ></b>\n\n尊享万车汇俱乐部及联盟商家汽车服务最低价格优惠，产品服务特惠不定期更新。\n\n<style type=\"text/css\">\ntable.altrowstable {\nfont-family: verdana,arial,sans-serif;\nfont-size:13px;\nborder-collapse: collapse;\n}\ntable.altrowstable th {\ncolor:#ffffff;\nbackground-color: rgb(81, 130, 187);\ntext-align:center;\nborder-width: 2px;\nborder-style: solid;\nborder-color:#ffffff;\n}\ntable.altrowstable td {\ncolor:#333333;\ntext-align:center;\nborder-width: 2px;\nborder-style: solid;\nborder-color: #ffffff;\n}\ntable.altrowstable tr:nth-child(odd) {\nbackground: #FFFFFF\n}\ntable.altrowstable tr:nth-child(even) {\nbackground: #F0F0F0\n}\n</style>\n\n<table class=\"centered  bordered altrowstable\"> \n<tr>\n<th colspan=\"2\">养车支出项</th>\n<th>频次</th>\n<th>市场价</th>\n<th colspan=\"2\">万车汇黑卡会员价</th>\n</tr>\n\n<tr>\n<td rowspan=\"4\">保养<br/>（换机油+机滤+工时+4L机油）</td>\n<td rowspan=\"2\">快车</td>\n<td rowspan=\"2\">两月3次<br/>一年18次</td>\n<td>单次：200~220元</td>\n<td>单次：140元</td>\n<td rowspan=\"2\">一年省<b style=\"color:red\">1080+</b>元</td>\n</tr>\n<tr>\n<td>一年：3600~3960元</td><td>一年：2520元</td>\n</tr>\n\n<tr>\n<td rowspan=\"2\">专车<br/>（20万以下）</td>\n<td rowspan=\"2\">两月3次<br/>一年18次</td>\n<td>单次：363~414元</td>\n<td>单次：220元</td>\n<td rowspan=\"2\">一年省<b style=\"color:red\">2574+</b>元</td>\n</tr>\n<tr>\n<td>一年：6534~7452元</td><td>一年：3960元</td>\n</tr>\n\n<tr>\n<td rowspan=\"4\">洗车</td>\n<td rowspan=\"2\">快车</td>\n<td rowspan=\"2\">一月3次<br/>一年36次</td>\n<td>单次：25~35元</td>\n<td>单次：15元</td>\n<td rowspan=\"2\">一年省<b style=\"color:red\">380+</b>元</td>\n</tr>\n<tr>\n<td>一年：900~1260元</td><td>一年：520元</td>\n</tr>\n\n<tr>\n<td rowspan=\"2\">专车</td>\n<td rowspan=\"2\">一月4次<br/>一年48次</td>\n<td>单次：25~35元</td>\n<td>单次：15元</td>\n<td rowspan=\"2\">一年省<b style=\"color:red\">480+</b>元</td>\n</tr>\n<tr>\n<td>一年：1200~1680元</td><td>一年：720元</td>\n</tr>\n\n<tr>\n<td rowspan=\"2\">喷漆</td>\n<td>快车&优享</td>\n<td>一年2次</td>\n<td>400元/面</td>\n<td>220元/面</td>\n<td>一年省<b style=\"color:red\">360+</b>元</td>\n</tr>\n\n<tr>\n<td>专车<br/>（20万以下）</td>\n<td>一年2次</td>\n<td>600元/面</td>\n<td>300元/面</td>\n<td>一年省<b style=\"color:red\">600+</b>元</td>\n</tr>\n\n</table>\n\n<big><b>万车汇会员黑卡</b></big>\n<p><b style=\"color:red\">365</b>天，每天<b style=\"color:red\">1</b>元，全年至少省<b style=\"color:red\">3000+</b>\n\n更多权益敬请期待。。。。\n\n",
            "overtime" : "365",
            "intro" : "\n\n1.会员凭万车汇黑卡，即可享受相关会员权益服务。\n\n\n2.会员有效期从购卡当日算起，一年内有效，过期权益不可使用。\n\n3.会员实行一人一卡一车制，只有绑定车辆才可享受汽车优惠服务。\n\n4.登录万车汇平台—会员中心，即可预约并查看最新会员权益服务。\n\n\n5.购卡一月内，未使用免费券的，可全额退款；已使用免费券的，扣除相应款项，最终解释权归发卡方所有。\n\n6.如有任何会员相关问题，请联系在线客服万小秘，搜索微信公众号：carhubs，或至万车汇俱乐部店内咨询。\n"
          }
        ],
      "coupons" :
        [
          { "couponId" : "9xMGRBouFmSEvQ3LZ",
            "content" : { "moneyName" : "保养券", "moneyMany" : "96", "moneyOvertime" : "2017-12-24",
            "moneyMuch" : "200", "limit" : "", "moneyDecription" : "\n1.本券服务含：更换机油、机滤、工时费及4L机油（指定），适用10万元以内的车型。如有超出保养范围的其它维修项目可补足差价。\n\n2.仅限会员本人使用，不可开发票。\n\n3.为节省您的时间，避免服务高峰，请提前预约服务门店和时间。\n\n4.预约二维码，一经验证，视为已用，用户不得重复使用。\n\n5.有效日期：2017年6月24日——2017年12月24日，过期不可用。\n\n6.如有任何问题，请联系在线客服万小秘，搜索微信公众号：carhubs，或至万车汇俱乐部店内咨询。\n" }, "type" : "money",
            "gotTime" : new Date(), "count" : "1"
          }
        ]
    }
  })
}

export function checkUserHasCards(userId){
  let user = findUserById(userId);
  if (user.cards == undefined) {
    return false;
  }
  return true;
}


export function findOrCreateUserByMobile(mobile){
  let exists = false;
  let user =  Meteor.users.findOne({"profile.mobile": mobile.toString()});
  if (user) {

    exists = true;
  }
  if (user == undefined) {
    let user_id =   Accounts.createUser({
          username: mobile.toString(),
          password: mobile.toString(),
        });
      Meteor.users.update(user_id,{
          $set: {
            "profile.mobile": mobile.toString()
          }
        });
    user = Meteor.users.findOne({_id: user_id});
  }

  return {
    exists,
    user,
  }
}

export function updateUsernameByMobile(mobile){
  let user = findOrCreateUserByMobile(mobile);
  return Meteor.users.update(user._id, {
    $set: {
      username: mobile
    }
  })
}

export function getLimitUserIds(condition, page, pageSize){
  let users =  Meteor.users.find(condition, {
    skip: (page-1)*pageSize, limit: pageSize,
    sort: {"createdAt": -1},
    fields:
      {
        _id: 1,
        username: 1,
        profile: 1,
        nickname: 1,
      }
    }
  );
  let user_ids = [];
  users.forEach((user)=>{
    user_ids.push(user._id);
  });
  return user_ids;
}

export function getBasicUserById(userId){
  return Meteor.users.findOne({_id: userId}, {fields: {
      '_id': 1, 'username': 1, 'profile.mobile': 1, 'nickname': 1
  }});
}

export function getUserByAgencyId(agencyId){
  let agency = findAgencyById(agencyId);
  if (agency == undefined) {
    return {};
  }
  return getBasicUserById(agency.userId);
}

export function removeUserById(userId){
  let user = Meteor.users.findOne({_id: userId});
  if (Meteor.users.find({username: "deletedUser"+user.username}).count()>=0) {
    Meteor.users.remove({username: "deletedUser"+user.username});
  }
  let deletedUserId =  Accounts.createUser({
        username: "deletedUser"+user.username,
        password: "deletedUser2017best",
      });
    let mobile = "13000000000"
  if (user.profile != undefined) {
    if (user.profile.mobile != undefined) {
      mobile = user.profile.mobile
    }
  }
  Meteor.users.update(deletedUserId, {
    $set: {
      carnumber: "京A00000",
      profile: {
        mobile: mobile,
      }
    }
  });
  let agency = giveCardByUserId(deletedUserId);
  //迁移所有下级代理
  MoveAgenciesFromOneUserToAnother(deletedUserId, userId);
  //清理要删除的用户的所有相关
  Orders.remove({createdBy: userId});
  let balance = Balances.find({userId});
  BalanceIncomes.remove({balanceId: balance._id});
  BalanceCharges.remove({balanceId: balance._id});
  Balances.remove({userId});
  Bankcards.remove({userId});
  Devices.remove({userId});
  Messages.remove({userId});
  UserCards.remove({userId});

  return Meteor.users.remove({_id: userId});

}

Date.prototype.Format = function(format){

  var o = {

  "M+" : this.getMonth()+1, //month

  "d+" : this.getDate(), //day

  "h+" : this.getHours(), //hour

  "m+" : this.getMinutes(), //minute

  "s+" : this.getSeconds(), //second

  "q+" : Math.floor((this.getMonth()+3)/3), //quarter

  "S" : this.getMilliseconds() //millisecond

  }

  if(/(y+)/.test(format)) {

  format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));

  }

  for(var k in o) {

    if(new RegExp("("+ k +")").test(format)) {

      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));

    }

  }

  return format;

}
