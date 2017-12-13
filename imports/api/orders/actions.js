
//分享订单
//
import {Orders} from './orders.js';

export function OrdersCount(){
  return Orders.find().count();
}
