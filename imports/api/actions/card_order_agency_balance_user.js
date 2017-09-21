export function userBuyCardFromAgencyByMobiles(userMobile, agencyMobile, carId){
  //验证order
  let Order = findPaidOrderBy;
}

//特殊事件，用以找回丢失的数据和关系链
export function giveUserCardFromAgencyByMobiles(userMobile, agencyMobile, carId){
  // 给卡
  let card_given_result = giveCardToUser(cardId, user._id);

  if (card_given_result == undefined) {
    return {
      error: "GIVE CARD FAILED"
    }
  }
  //建立用户
  let user = findOrCreateUserByMobile(userMobile);
  let agency_user = findOrCreateUserByMobile(agencyMobile);

  //建立分销链
  let agency = findOrCreateAgencyByUserId(user._id);
  let super_agency = findOrCreateAgencyByUserId(agency_user._id);

  let build_agency_link_result = letAgenciesBind(agency._id, super_agency._id);
  if (build_agency_link_result == undefined) {
    return {
      error: "AGENCY LINK FAILED"
    }
  }
  let super_super_agency = findSuperAgencyById(super_agency)
  //记账和给钱

  let user_balance = findBlanceFromUserId(user._id);
  let agency_balance =  findBalanceByUserId(agency_user._id);





}
