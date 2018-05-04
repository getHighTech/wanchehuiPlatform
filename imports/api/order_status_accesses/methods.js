import { Meteor } from 'meteor/meteor';
import {OrderStatusAccesses} from './order_status_accesses';




Meteor.methods({
  'order_status_accesses.insert'(){

  },
  'get.OrderState.byStatus'(status){
    return OrderStatusAccesses.find({'sFrom':status}).fetch();
  }

  })
