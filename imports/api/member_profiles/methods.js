import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MemberProfiles } from './member_profiles.js';
import { MemberApplies } from '../member_applies/member_applies.js';
Meteor.methods({
  'member_profiles.delete'(id) {

    return MemberProfiles.remove(id);
  },
  
  
});
