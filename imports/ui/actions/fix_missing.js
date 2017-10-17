export function fixMissedCarNumber(userId, carNumber){
  return Meteor.call("users.fixMissedCarNumber", userId, carNumber, function(error, result){
    if (!error) {
      if (result === 0) {
        return "车牌号绑定成功";
      }
    }
  })
}
