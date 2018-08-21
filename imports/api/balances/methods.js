import { Meteor } from 'meteor/meteor';

import {findBalanceChargeData} from './balance_charge_actions.js'
import {BalanceCharges} from './balance_charges';
import {Balances} from './balances';
import {allBalanceChargeCount,getCurrentMonthFirst,getCurrentMonthLast} from './actions.js';
import { Bankcards } from "/imports/api/bankcards/bankcards.js";
import { BalanceIncomes } from './balance_incomes.js';
import {Shops} from '../shops/shops'
import { findBalanceByUserId, findBalanceByUserIdAll, findBalanceByUsername } from './balances_actions.js'
import { getIncomeRecords } from './balance_incomes_actions.js'
import { log } from 'util';
import { validLoginToken } from '../actions/validLoginToken.js';

Meteor.methods({
  "balances.userId"(userId){
    return findBalanceByUserId(userId);
  },
  "balances.userId.all"(userId){
    return findBalanceByUserIdAll(userId);
  },
  "balance.username"(username){
    return findBalanceByUsername(username);
  },

  "balance.chargesdata"(condition,page=1, pageSize=20){

    let chargesdata =  BalanceCharges.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'text':1,
        "money":1,
        'bankId':1,
        'userId':1,
        'status':1,
        'createdAt': 1,
      }

    })
    return chargesdata.fetch();
  },
  "balance.chargesOne"(_id){
    return BalanceCharges.findOne(_id);
  },
  'balance.userId'(userId){
    return Balances.findOne({userId:userId});
  },
  'balances.updaterevoke.amount'(userId,money,amounted){
    let balance = Balances.findOne({userId: userId})
    let amount=money/100+amounted
    return Balances.update(balance._id, {
      $set: {
        amount: amount
      }
    });
  },
  "balancecharge.count"(condition){
    return allBalanceChargeCount(condition);
    //return BalanceCharges.find(condition).count();
  },
  'bankcards.accountNumber'(_id){
    return Bankcards.findOne({userId:_id}).accountNumber;
  },
  'bankcards.accouts'(ids) {
    return Bankcards.find({_id: {$in: ids}}).fetch();
  },
  'bankcards.address'(ids) {
    return Bankcards.find({userId: {$in: ids}}).fetch();
  },
  "get.limit.balance_incomes"(page, pagesize, balanceId, userId){
    return getIncomeRecords(page, pagesize, balanceId, userId);
  },
  "balancecharge.status.updatePaid"(_id){
    return BalanceCharges.update(_id,{
      $set:{
        status:"paid"
      }
    })

  },
  "balancecharge.status.updateRevoke"(_id){
    return BalanceCharges.update(_id,{
      $set:{
        status:"revoke"
      }
    })
  },
  "get.balance_charges.InThisTime"(condition,page=1, pageSize=20){
    return BalanceCharges.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'text':1,
        "money":1,
        'bankId':1,
        'userId':1,
        'status':1,
        'address':1,
        'createdAt': 1,
      }

    },{sort: {"createdAt": -1}}).fetch();
  },
  "get.balance_charges.InThisTimeCount"(condition){
    return BalanceCharges.find(condition).count();
  },
   'app.get.balance_incomes.toady.total'(userId,token){
    if(validLoginToken(token)){
      console.log(`获取佣金`)
    console.log(userId)
    let date = new Date();
    let nextdate = (new Date((date/1000+86400)*1000))
    var currentDate = date.Format("yyyy/MM/dd");
    var nextDate = nextdate.Format("yyyy/MM/dd");
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))
    var currentMondayDate =  (new Date((exdate/1000+86400*7
      )*1000)).Format("yyyy/MM/dd");
    var exDate = exdate.Format("yyyy/MM/dd");
    var getCurrentMonthFirstDay = getCurrentMonthFirst().Format("yyyy/MM/dd");
    var getCurrentMonthLastDay = getCurrentMonthLast().Format("yyyy/MM/dd");
    let today_balance_incomes = BalanceIncomes.aggregate([
        { $match: {userId: userId, createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)}}},
        { $group: {_id: '$userId',total: {$sum: "$amount"}}}
    ])
    let week_balance_incomes = BalanceIncomes.aggregate([
        { $match: {userId: userId,createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentMondayDate)}}},
        { $group: {_id: '$userId',total: {$sum: "$amount"}}}
    ])
    let month_balance_incomes = BalanceIncomes.aggregate([
        { $match: {userId: userId,createdAt: {'$gte':new Date(getCurrentMonthFirstDay),'$lte':new Date(getCurrentMonthLastDay)}}},
        { $group: {_id: '$userId',total: {$sum: "$amount"}}}
    ])
    if(today_balance_incomes.length==0){
      today_balance_incomes =  0 
    }else{
      today_balance_incomes = today_balance_incomes[0].total
    }
    if(week_balance_incomes.length==0){
      week_balance_incomes =  0 
    }else{
      week_balance_incomes = week_balance_incomes[0].total
    } 
    if(month_balance_incomes.length==0){
      month_balance_incomes = 0 
    }else{
      month_balance_incomes = month_balance_incomes[0].total
    }
    let total = {todayTotal: today_balance_incomes, weekTotal:  week_balance_incomes,monthTotal: month_balance_incomes, }
    console.log(total);
    return { total,formMethod: 'app.get.balance_incomes.toady.total' }
  }else{
    return { formMethod: 'app.get.balance_incomes.toady.total', err: "ACCESS DENY"}
  }
    
  },
  "app.get.current.balance" (userId,token) {
    console.log(`userId`);
    console.log(userId)
    if(validLoginToken(token)){
      let balance = Balances.findOne({userId: userId})
      if(balance==null){
        balance = {amount: 0}
      }
      return Object.assign({},balance,{ formMethod: 'app.get.current.balance'})
    }else{
      return {formMethod: 'app.get.current.balance', err: "ACCESS DENY"}
    }
  },
 'get.balanceChargesByShopId'(shopId,page,pageSize,condition){
  console.log('获取提现记录')
  console.log(shopId)
  console.log(condition)
  let shop = Shops.findOne({ _id: shopId})
  let appName = shop.appName
  if (appName ==='wanrenchehui'){
    let result =  BalanceCharges.find({appName: { $exists: false } },{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
      return result
  }else if(appName){
    console.log('测试查询条件合并')
    let new_condition = Object.assign({'appName':appName},condition)
    console.log(new_condition)
    let result =  BalanceCharges.find(new_condition,{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
    result.forEach((item)=>{
      let user =  Meteor.users.findOne({_id:item.userId})
      if(user){
        console.log(user)
        item.username = user.username 
      }
    })
    console.log(result)
    return result
  }else{
    console.log('未获取到当前店铺ID')
  }

 }
});
