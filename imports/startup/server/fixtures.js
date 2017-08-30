// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { MemberAbilities } from '../../api/member_abilities/member_abilities.js';
import { PageContents } from '../../api/pages/page_contents.js';
import { Pages } from '../../api/pages/pages.js';
import { Services } from '../../api/services/services.js';
import { Arrangements } from '../../api/arrangements/arrangements.js';
import { prebuildAdmin } from './roles_fixture.js';

Meteor.startup(() => {
  prebuildAdmin();

  });
