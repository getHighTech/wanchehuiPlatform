import { Meteor } from 'meteor/meteor';

import { Agencies } from './agencies.js';

import {changeSuperAgency, findAgencyByUserId} from './actions.js'


Meteor.methods({
  'get.agencies.limit'(condition, page, pageSize){

    let agencies =  Agencies.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
          'userId': 1,
          'superAgencyId': 1,
          'createdAt': 1,
          'productId': 1,
        }
      }
    );
    return agencies.fetch();

  },
  'agencies.changeSuperAgency'(agencyId, superAgencyId, giveReason={
    type: "agencyCard"
  }, loseReason={
    type:  "refund"
  }, productId){
    return changeSuperAgency(agencyId, superAgencyId, giveReason, loseReason, productId);
  },
  'agency.userId'(userId){
    return findAgencyByUserId(userId);
  }
});
