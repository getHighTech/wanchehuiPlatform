import { Meteor } from 'meteor/meteor';

import { Devices } from './devices.js'

Meteor.methods({
  "devices.getone"(finger){

    return Devices.findOne({finger}, {sort: {createdAt: -1}})

  },

  'devices.update'(id, condition){

  },

  'devices.insert'(finger, superAgencyId, userId, productId){
      return Devices.insert({
        finger, superAgencyId, userId, productId,
        createdAt: new Date()
      });
  }

});
