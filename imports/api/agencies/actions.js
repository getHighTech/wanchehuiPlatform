import { Meteor } from 'meteor/meteor';
import { Agencies } from './agencies.js';

import {giveUserMoney, loseUserMoney} from '../balances/actions';

export function findAgencyByUserId(userId){
  let agency = Agencies.findOne({userId});
  if (!agency) {
    return "AGENCY NOT FOUND";
  }
  return agency;
}

export function findAgencyByUserIdAndProductId(userId, productId){
  return Agencies.findOne({userId, productId});
}

export function findAgencyById(id){
  return Agencies.findOne({_id: id});
}

export function addNewAgency(userId, productId){

  return Agencies.insert({
    userId,
    productId,
    createdAt: new Date()
  })
}



export function findOrCreateAgencyByUserId(userId, productId){
  let agency = findAgencyByUserId(userId);
  if (agency) {
    return agency;
  }
  agency = addNewAgency(userId, productId);
  return agency;

}

export function updateSuperAgency(agencyId, superAgencyId){
  let agency = findAgencyById(agencyId);
  return Agencies.update(agencyId, {
    $set: {
      superAgencyId
    }
  });
}

export function updateSuperAgencyFromUser(userId, superAgencyId){
  let agency = findOrCreateAgencyByUserId(userId);
  return updateSuperAgency(agency._id, superAgencyId);
}

export function findSuperAgencyById(id){
  let agency = findAgencyById(id);
  if (!agency) {
    return null;
  }
  if (agency.superAgencyId === undefined) {
    return null;
  }
  return Agencies.findOne({_id: agency.superAgencyId});
}

export function findSuperAgencyByUserId(userId){
  let agency = findAgencyByUserId({_id: userId});
  return findSuperAgencyById(agency._id);
}

export function getPageAgencies(conditon, page, pageSize){
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
}

export function recycleSuperAgencyMoney(agencyId, reason){
  let superAgency = findSuperAgencyById(agencyId);
  if (!superAgency) {
    return "NO NEED TO RECYCLE BECAUSE THERE HAS NO SUPER";
  }
  loseUserMoney(superAgency.userId, 3880, reason);
  let superSuperAgency = findSuperAgencyById(superAgency.superAgencyId);
  if (!superSuperAgency) {
    return "NO NEED TO RECYCLE BECAUSE THERE HAS NO SUPER SUPER";
  }
  return loseUserMoney(superSuperAgency.userId, 1280, reason);
}

export function giveAgencyMoney(agencyId, reason){
  let agency = findAgencyById(agencyId);
  if (!agency) {
    return "NO NEED TO GIVE MONEY BECAUSE THERE HAS NO AGENCY";
  }
  giveUserMoney(agency.userId, 3880, reason);
  let superAgency = findAgencyById(agency.superAgencyId);
  if (!superAgency) {
    return "NO NEED TO GIVE MONEY BECAUSE THERE HAS NO SUPER SUPER";
  }
  console.log("superAgency", superAgency);
  return giveUserMoney(superAgency.userId, 1280, reason);
}

export function changeSuperAgency(agencyId, superAgencyId, giveReason, loseReason){
  let agency = findAgencyById(agencyId);
  let note=""
  if (!agency) {
    return "AGENCY NOT FOUND IN changeSuperAgency";
  }
  let superAgency = findAgencyById(superAgencyId);
  if (!superAgency) {
    return "SUPER AGENCY NOT FOUND IN changeSuperAgency"
  }
  if (agency.superAgencyId === superAgencyId) {
    return "AGENCY STILL"
  }else{
    recycleSuperAgencyMoney(agencyId, loseReason);
  }
  let updateRlt = Agencies.update(agencyId, {
      $set: {
        superAgencyId,
      }
    });


  if (updateRlt) {
    return giveAgencyMoney(superAgencyId, giveReason);
  }
  return 0;

}
