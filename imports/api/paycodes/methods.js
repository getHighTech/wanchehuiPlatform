
import { Meteor } from 'meteor/meteor';

import {Orders} from '/imports/api/orders/orders.js'
import {Cards} from '/imports/api/cards/cards.js'
import {Coupons} from '/imports/api/coupons/coupons.js'

import {Paycodes} from './paycodes.js';

import {afterCardPaySuccess} from './actions.js'

Meteor.methods({
  'paycodes.insert'(originNum, price, code,note){
    return Paycodes.insert({
      originNum, price, code,note,
      createdAt: new Date()
    })
  },
  'paycodes.beeCloud.sign'(orderId, price){
    var appid = "cce84511-2184-4b23-ab92-457166af5e27";
    var secret = "b28999f8-529c-4a25-9185-e6f7921a19e9";
    var title = "万车汇订单";
    var amount = price.toString();

    var uuid = require('uuid');
    var outTradeNo = uuid.v4();
    outTradeNo = outTradeNo.replace(/-/g, '');

    var data = appid + title + amount + outTradeNo + secret;
    var sign = require('crypto');
    var signStr = sign.createHash('md5').update(data, 'utf8').digest("hex");



    return {appid: appid, sign: signStr, outTradeNo};
  },

  'paycodes.get.wechat.openid'(code){
    //获取微信的openid
    let res = HTTP.call(
    "GET",
      "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx9ca3272fed4926ba&secret=9f22e4512d30fd774d93defa85c3282b&code="+code+"&grant_type=authorization_code ",
    );

     let content=eval("("+res.content+")");

    return content;
  },

  'paycode.wechat.payout'(orderId, fromId){
    //微信支付成功
    let order = Orders.findOne({_id: orderId});

    if (order == undefined) {
      return '此页面已经过期，请返回刷新重试';
    }
    if (order.status == 'paid') {
      return '此页面已经过期，请返回刷新重试';
    }
    if (order.type === 'card') {
      //若是订单是买卡类型的，则绑定卡片，并且提供相应优惠券赠送

    afterCardPaySuccess(order, fromId);





    }//end of if type == card
    return Orders.update(order._id, {
      $set: {status: 'paid'}
    });
  },

  'paycodes.payout'(originNum, code, orderId, fromId){
    let paycode = Paycodes.findOne({originNum, code});
    if (paycode == undefined) {
      return "支付码错误或者已经使用";

    }else if (Paycodes.remove({_id: paycode._id}) != 1) {
      return '支付码错误'
    }
    let order = Orders.findOne({_id: orderId});

    if (order == undefined) {
      return '此页面已经过期，请返回刷新重试';
    }
    if (order.type === 'card') {
      //若是订单是买卡类型的，则绑定卡片，并且提供相应优惠券赠送

    afterCardPaySuccess(order, fromId);




    }
    return Orders.update(order._id, {
      $set: {status: 'paid'}
    });

  }
})
