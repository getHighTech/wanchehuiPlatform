import { Agencies } from "./agencies.js";
import { BalanceIncomes } from '../balances/balance_incomes.js';
export function checkAgencies(){

  let undeal = 0;
  let correted = 0;
  let needToAnyalse = 0;
  let thereIsNoSuper = 0;
  let dealingAgency = 0;
  Agencies.find({}).forEach((agency)=> {
    let income =BalanceIncomes.find({agency: agency._id});
    let superIncome = BalanceIncomes.findOne({agency: agency.superAgencyId});
    let superAgency = Agencies.findOne({_id: agency.superAgencyId});
    dealingAgency++;
    console.log(`========================================================`);

    console.log(`正检查第${dealingAgency}个代理,生成时间是${moment(agency.createdAt).format("YYYY-MM-DD HH:mm:ss")}`);
    if (income.count()==2) {
      console.log('没有问题');
      correted++
    }else{
      console.log(`----------------------------------------`);

      console.log("此分享没有入账，有错误！！！");
      undeal++;
      if (superAgency) {
        console.log("上级存在");
        let superUser = Meteor.users.findOne({_id: superAgency.userId});
        let superSuperAgency = Agencies.findOne({_id: superAgency.superAgencyId})
        console.log("上级代理用户是： ", superUser.username);

        if (!superSuperAgency) {
          console.log('上上级代理不存在');
        }else{
          let superSuperUser = Meteor.users.findOne({_id: superSuperAgency.userId});
          console.log("上上级代理用户是： ", superSuperUser.username);

        }


        if (superIncome) {
          console.log("上级账本能够对上");
        }else{
          needToAnyalse++;
          if (superUser.username === "wanchehui") {
            console.log('上级代理是万车汇，万车汇代理为分销测试，可以不严格对应收入(万车汇拿不到佣金没有关系)');
          }else{
            console.log("上级没有账本，需要进一步分析"+needToAnyalse.toString());
          }
        }
      }else{
        console.log("上级不存在,本级为", agency);
        let username = ''
        let nowUser = Meteor.users.findOne({_id: agency.userId});
        if (nowUser === undefined) {
          console.log('该代理的用户已经丢失！！开始删除此节点');
          Agencies.remove({_id: agency._id});
          Agencies.remove({superAgencyId: agency._id});
        }else{
            username = nowUser.username;
            console.log("上级不存在,本级用户为", username);
        }
        if (username === "wanchehui") {
          console.log("本级用户是根级别，没有上级");
          if (!agency.isRoot) {
            Agencies.update(agency._id, {
              $set: {
                isRoot: true,
              }
            });
          }

        }
      }

    }


  });
  console.log("没有处理好的", undeal);
  console.log("处理好的", correted);
  console.log("需要进一步分析的", needToAnyalse);
  console.log("没有上级的代理有", thereIsNoSuper);
    console.log(`========================================================`);
}
