import { Meteor } from 'meteor/meteor';
import { Agencies } from './agencies.js';


export function findAgencyByUserId(userId){
  return Agencies.findOne({userId});
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
  if (agency.superAgencyId === undefined) {
    return null;
  }
  return Agencies.findOne({_id: agency.superAgencyId});
}

export function findSuperAgencyByUserId(userId){
  let agency = findAgencyByUserId({_id: userId});
  return findSuperAgencyById(agency._id);
}
