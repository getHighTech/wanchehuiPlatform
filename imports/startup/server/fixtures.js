// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';
import { BalanceIncomes } from '/imports/api/balances/balance_incomes.js';


Meteor.startup(() => {
  //delete roles;
  prebuildAdmin();

});
