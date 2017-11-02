import { Meteor } from 'meteor/meteor';
import {findUserByMobile, findUserById, findOrCreateUserByMobile} from '../users/actions.js';
import {findAgencyByUserId, findSuperAgencyById,
  findAgencyById, findOrCreateAgencyByUserId} from '../agencies/actions.js';

export function findAgencyByUserMobile(mobile){
  let user = findUserByMobile(mobile);
  return findAgencyByUserId(user._id);

}

export function findSuperAgencyByUserMobile(mobile){
  let agency = findSuperAgencyByUserMobile(mobile);
  return findSuperAgencyById(agency._id);
}


export function findUserByAgencyId(agencyId){
  let agency = findAgencyById(agencyId);
  return findUserById(agency.userId);

}

export function findOrCreateAgencyByMobile(mobile, productId){

  let userResult = findOrCreateUserByMobile(mobile);

  return findOrCreateAgencyByUserId(userResult.user._id, productId);
}
