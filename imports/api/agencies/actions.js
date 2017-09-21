import { Meteor } from 'meteor/meteor';
import { Agencies } from './agencies.js';


export functon findAgencyByUserId(userId){
  return Agencies.findOne({userId});
}

export functon findAgencyByUserIdAndProductId(userId, productId){
  return Agencies.findOne({userId, productId});
}

export function findAgencyById(id){
  return Agencies.findOne({_id: id});
}

export function findSuperAgencyById(id){
  let agency = findAgencyById(id)
  if (!agency.superAgencyId) {
    return null;
  }
  return Agencies.findOne({superAgencyId: agency._id});
}
