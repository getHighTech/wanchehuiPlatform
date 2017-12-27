export function checkAllUsersIncomes(){
  
}

export function checkUserStatus(userId, productId)
{
  let orders = [];
  //找出user的所有代理
  let userAgency = null;

  //找到user的所有下级代理
  let lowerAgencies = [];

  //找到user的所有下下级别
  let lowestAgencies = [];

  //找出user的上级代理
  let superAgency = null;


  //找出user的上上级代理
  let superSuperAgency = null;

  //找出user的收入记录
  let incomes = [];

  //比对收入记录和user的下级代理数
  if ((lowerAgencies.length+ lowestAgencies.length) != incomes.length) {
    return "INCOMES RECORDS ERROR";
  }





  //查出user的支出记录
  let charges = [];

  //找出user的账户
  let userAccount = null;


}
