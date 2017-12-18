
//分享订单
//
import {Orders} from './orders.js';

export function ordersCount(condition){
  return Orders.find(condition).count();
}
