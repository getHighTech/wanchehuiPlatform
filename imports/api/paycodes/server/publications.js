import { Meteor } from 'meteor/meteor'

import { Paycodes } from '../paycodes.js'

Meteor.publish('paycodes.limit', function(page=0, pagesize=20) {
  return Paycodes.find({},
    {skip:page*pagesize, limit: pagesize,sort: {createdAt: -1}});

});
