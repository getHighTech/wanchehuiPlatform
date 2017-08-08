import { Meteor } from 'meteor/meteor';

import { Agencies } from './agencies.js';
import { Orders } from '/imports/api/orders/orders.js';

import { becomeAgency, generateNewRoot } from './actions.js'


Meteor.methods({
  'agencies.insert'(superAgencyId, agency){

  },
  'agencies.share'(userId, productId){
    //先判断他是否有购买的其所要分享的商品
    let order = Orders.findOne({userId, productId, status: "paid"});
    if (order == undefined) {
      return '请先购买此商品才能销售';
    }
    let agency = Agencies.findOne({userId, productId});
    return agency._id;

  },


  'agencies.set.root'(userId, productId){
      return generateNewRoot(userId, productId);
  },
  'agencies.set.session'(agencyId){
    return ServerSession.set("superAgencyId", agencyId);
  },

  "agencies.remove"(id){
    let agency = Agencies.findOne({_id: id});
    if (agency.createdAt == undefined) {
      Agencies.update(agency._id, {
        $set: {
          createdAt: new Date()
        }
      });
    }
    if (agency.flag == 1) {
      //若是当前要删除的节点处于排队的头部，则把头部指向下一个根代理人;
       let head_agency = Agencies.findOne({ 'createdAt': { '$lt': agency.createdAt } }, {sort: {createdAt: -1}});
       Agencies.update(head_agency._id, {
         $set: {
           flag: 1
         }
       });
    }
    return agency.remove({_id, id});
  }
});
