import { Agencies } from "./agencies.js";
import { BalanceIncomes } from '../balances/balance_incomes.js';
import { Balances } from '../balances/balances.js';
export function checkAgencies(){

  let undeal = 0;
  let correted = 0;
  let needToAnyalse = 0;
  let superSuperAgencyMissing = 0;
  let dealingAgency = 0;

  Agencies.find({}).forEach((agency)=> {
    let income =BalanceIncomes.find({agency: agency._id});
    let superIncome = BalanceIncomes.findOne({agency: agency.superAgencyId});
    let superAgency = Agencies.findOne({_id: agency.superAgencyId});
    dealingAgency++;
    console.log(`========================================================`);

    console.log(`正检查第${dealingAgency}个代理,生成时间是${moment(agency.createdAt).format("YYYY-MM-DD HH:mm:ss")}`);
    if (income.count()>=2) {
      console.log('没有问题');
      correted++
    }else{
      console.log(`----------------------------------------`);

      console.log("此分享没有入账，有错误！！！");
      let user = Meteor.users.findOne({_id: agency.userId});
      if (user) {
        console.log("这个代理的用户是", user.username);
        if (user.cards) {
          console.log("这个代理的用户有卡数量", user.cards.length);
          if (user.cards.length >= 1) {
            console.log('这个代理是合法的');

          }else{
            console.log('这个代理是非法的，应该被删除');

            if (Agencies.remove({_id: agency._id})) {
                console.log('删除成功');
            }
            illagency++;
          }
        }else{
          console.log('这个代理是非法的，应该被删除');
          if (Agencies.remove({_id: agency._id})) {
              console.log('删除成功');
          }
          illagency++;
        }

      }else{
        console.log('此代理的用户不存在！');
        Agencies.remove({_id: agency._id});
        userNotFound++;
      }

      undeal++;
      if (superAgency) {
        console.log("上级存在", superAgency);
        let superUser = Meteor.users.findOne({_id: superAgency.userId});
        let superSuperAgency = Agencies.findOne({_id: superAgency.superAgencyId})
        console.log("上级代理用户是： ", superUser.username);
        let balance = Balances.findOne({userId: superAgency.userId});
        if (!balance) {
          console.log("上级用户没有钱包，正在创建");
          let bid = Balances.insert({
            userId: superAgency.userId,
            amount: 0,
            createdAt: new Date()
          })
          balance = Balances.findOne({_id: bid});
        }
        if (balance) {
          console.log('应该入账的账户是', balance);
          let user_income = BalanceIncomes.findOne({agency: agency._id, userId: superUser._id, balanceId: balance._id, amount: 3880});
          if (!user_income) {
            BalanceIncomes.insert({
              reasonType: "agencyGive",
              agency: agency._id, balanceId: balance._id, userId: superUser._id, amount: 3880,
              text: "分享奖励",
              createdAt: new Date()
            });
            Balances.update(balance._id, {
              $set: {
                amount: balance.amount+3880,
              }
            });
            console.log('新的账户余额更新：', balance.amount);
          }else{
            console.log('用户的上级已经入账，开始检查其上上级别', BalanceIncomes.find({agency: agency._id, amount: 3880}).count());
          }

        }


        if (!superSuperAgency) {
          console.log('上上级代理不存在', superAgency);
          superSuperAgencyMissing++;
        }else{
          let super_balance = Balances.findOne({userId: superSuperAgency.userId});
          if (!super_balance) {
            console.log("上上级用户没有钱包，正在创建");
            let sbid = Balances.insert({
              userId: superSuperAgency.userId,
              amount: 0,
              createdAt: new Date()
            })
            super_balance = Balances.findOne({_id: sbid});
          }
          let superSuperUser = Meteor.users.findOne({_id: superSuperAgency.userId});
          console.log("上上级代理用户是： ", superSuperUser.username);
          let superUserIncome = BalanceIncomes.findOne({agency: superSuperAgency._id, userId: superSuperUser._id, balanceId: super_balance._id, amount: 1280});
          //==给上级钱
          if (!superUserIncome) {
            BalanceIncomes.insert({
              reasonType: "agencyGive",
              agency: agency._id, balanceId: super_balance._id, userId: superUser._id, amount: 1280,
              text: "分享奖励",
              createdAt: new Date()
            });
            Balances.update(super_balance._id, {
              $set: {
                amount: super_balance.amount+1280,
              }
            });
            console.log('新的上上级别账户余额更新：', super_balance.amount);
          }else{
            console.log('用户的上上级已经入账，无需进一步操作', BalanceIncomes.find({agency: superSuperAgency._id, amount: 1280}).count());
          }
          //==end of 给上上级别钱

        }


        if (superIncome) {
          console.log("上级账本能够对上");
        }else{
          needToAnyalse++;
          if (superUser.username === "wanchehui") {
            console.log('上级代理是万车汇，万车汇代理为分销测试，可以不严格对应收入(万车汇拿不到佣金没有关系)');
          }
          if (superUser.username === "小马过河") {
            console.log('上级代理是马哥，马哥作为初始级别用户，可以不严格对应收入');

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

        }else{
          console.log('将所有没有上级代理的用户给马哥');
          let mage = Meteor.users.findOne({username: '小马过河'});
          let mageAgency = Agencies.findOne({userId: mage._id});
          Agencies.update(agency._id, {
            $set: {
              superAgencyId: mageAgency._id,
            }
          });
        }
      }

    }


  });
  console.log("没有处理好的", undeal);
  console.log("处理好的", correted);
  console.log("没有上上级别", superSuperAgencyMissing);
  console.log("需要进一步分析的", needToAnyalse);
    console.log(`========================================================`);
}
