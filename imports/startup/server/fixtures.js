// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { prebuildAdmin } from './roles_fixture.js';

Meteor.startup(() => {
  prebuildAdmin();

  });
