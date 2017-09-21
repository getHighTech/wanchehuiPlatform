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

export function addNewAgency(userId, productId){
  return Agencies.insert({
    userId,
    productId,
    createdAt: new Date()
  })
}



export function findOrCreateAgencyByUserId(userId){
  let agency = findAgencyByUserId(userId);
  if (agency) {
    return agency;
  }
  agency = addNewAgency();
  return agency;

}

export function updateSuperAgency(agencyId, superAgencyId){
  let agency = findAgencyById(agencyId);
  return Agencies.update({
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
  let agency = findAgencyById(id)
  if (!agency.superAgencyId) {
    return null;
  }
  return Agencies.findOne({superAgencyId: agency._id});
}
