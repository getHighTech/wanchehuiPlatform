import { Balances } from './balances';
import { BalanceIncomes } from './balance_incomes';
import { BalanceCharges } from './balance_charges';
export function checkBalances(){
  console.log('开始检查每一个账户信息');
  Balances.find({}).forEach((balance, index)=>{
    console.log('===============================================');
    console.log('正在检查第'+(index+1)+"个账户");
    let userId = balance.userId;
    let balanceId = balance._id;
    incomes = 0;
    charges = 0;
    BalanceIncomes.find({balanceId}).forEach((income)=>{
      incomes=incomes + income.amount;
    });
    BalanceCharges.find({userId}).forEach((charge)=>{
      charges=charges + charge.money;
    });
    console.log('这个账户的余额为', balance.amount);
    console.log('这个账户的收入为', incomes);
    console.log('这个账户的支出为', charges);
    console.log('收入减去支出为', incomes - charges);
    let user = Meteor.users.findOne({_id: userId});
    let needToGive = 0;
    if (incomes - charges < balance.amount ) {
      console.log('这个用户多了钱的', user.username);
      needToGive = incomes-charges-balance.amount;
      console.log('用户多了多少钱？', 0-needToGive);

    }
    if (incomes - charges > balance.amount) {
      console.log('用户少了钱的有', user.username);
      needToGive = incomes-charges-balance.amount;
      console.log('用户少了多少钱？', needToGive);
      Balances.update(balanceId, {
        $set: {
          amount: balance.amount+needToGive,
        }
      })
    }
    if (incomes - charges === balance.amount) {
      console.log('数目正确', '无需操作');
    }
  })

}
