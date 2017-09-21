import {findUserByMobile} from '../users/actions.js';
import {findBalanceByUserId} from '../balances/balance_actions.js';


export function findBalanceByUserMobile(mobile){
  let user = findUserByMobile(mobile);
  return findBalanceByUserId(user._id);
}
