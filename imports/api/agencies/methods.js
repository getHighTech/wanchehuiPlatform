import { Meteor } from 'meteor/meteor';

import { Agencies } from './agencies.js';


Meteor.methods({
  'get.agencies.limit'(condition, page, pageSize){

    let agencies =  Agencies.find(condition, {
      skip: (page-1)*pagesize, limit: pagesize,
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
});
