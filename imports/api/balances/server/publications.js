// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Balances } from '../balances.js';
import { BalanceIncomes } from '../balance_incomes.js';
import { BalanceCharges } from '../balance_charges.js';


Meteor.publish('get.current.balance', function(){
  return Balances.find({userId: this.userId});
})

Meteor.publish('app.get.current.balance', function(userId){
  // console.log(userId);
  // let currentDate = new Date();
  // let startDate = new Date(currentDate.getFullYear().toString(),currentDate.getMonth().toString(),'1')
  // let endDate = new Date(currentDate.getFullYear().toString(),currentDate.getMonth().toString(),'30')
  // console.log(startDate);
  // console.log(endDate);
  // let balanceIncomes = BalanceIncomes.find({userId: userId,createdAt: {$gte: startDate,$lte: endDate}}).fetch()
  // console.log(balanceIncomes);
  let balances =  Balances.find({userId: userId});
  // console.log(balances)
  return balances
})


function getCountDays() {
       let curDate = new Date();
        /* 获取当前月份 */
       let curMonth = curDate.getMonth();
       /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
       curDate.setMonth(curMonth + 1);
       /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
       curDate.setDate(0);
       /* 返回当月的天数 */
       return curDate.getDate();
}







Meteor.publish('get.balance.balance_incomes', function(balanceId, page=0, pagesize=68){
  return BalanceIncomes.find({balanceId},
    {skip: page, limit: page*pagesize, sort:{createdAt: -1}});
})

Meteor.publish('get.balance.balance_charges', function(balanceId, page=0, pagesize=68){
  return BalanceCharges.find({balanceId},
    {skip: page, limit: page*pagesize, sort:{createdAt: -1}});
})
