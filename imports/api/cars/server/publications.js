import { Meteor } from 'meteor/meteor';

import CarModel from '../model.js';

Meteor.publish('cars.limit', function (condition, page, pagesize, sortby) {

  return CarModel.limit(condition, page, pagesize, sortby);
  
});
