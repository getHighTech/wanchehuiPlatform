// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';

Meteor.startup(() => {
  prebuildAdmin();
  //修复的用户没有createdAt的错误

  });
