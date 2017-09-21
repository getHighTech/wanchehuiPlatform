import { Meteor } from 'meteor/meteor';
import {findUserByMobile, findUserById} from '../users/actions.js';
import {findAgencyByUserId, findSuperAgencyById} from '../agencies/actions.js';

export function findAgencyByUserMobile(mobile){
  let user = findUserByMobile(mobile);
  return findAgencyByUserId(user._id);

}

export function findSuperAgencyByUserMobile(mobile){
  let agency = findSuperAgencyByUserMobile(mobile);
  return findSuperAgencyById(agency._id);
}
