// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import {Partners} from './partners';

Meteor.methods({
  'member.applies.insert'(applyName, applyEmail, applyMobile, applyIntro){
    return Partners.insert({
      applyName,
      applyEmail,
      applyMobile,
      applyIntro,
      createdAt: new Date()
    });
  }
});
