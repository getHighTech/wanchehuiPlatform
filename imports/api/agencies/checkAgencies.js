import { Agencies } from "./agencies.js";
import { BalanceIncomes } from '../balances/balance_incomes.js';
export function checkAgencies(){

  let undeal = 0;
  let correted = 0;
  let needToAnyalse = 0;
  let thereIsNoSuper = 0;

  Agencies.find({}).forEach((agency)=> {
    let income =BalanceIncomes.findOne({agency: agency._id});
    let superIncome = BalanceIncomes.findOne({agency: agency.superAgencyId});
    let superAgency = Agencies.findOne({_id: agency.superAgencyId});
    if (superAgency) {
      console.log("上级存在");
    }else{
      thereIsNoSuper++;
      console.log("上级不存在");
    }
    if (income) {
      console.log("账本能够对上");
      correted++
    }else{
      console.log("此分享没有入账，有错误！！！");
      undeal++
    }

    if (superIncome) {
      console.log("上级账本能够对上");
    }else{
      needToAnyalse++;
      console.log("上级没有账本，需要进一步分析"+needToAnyalse.toString());
    }
  });
  console.log("没有处理好的", undeal);
  console.log("处理好的", correted);
  console.log("需要进一步分析的", needToAnyalse);
  console.log("没有上级的代理有", thereIsNoSuper);
}
