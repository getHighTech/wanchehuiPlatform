// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { prebuildAdmin } from './roles_fixture.js';
import { BalanceIncomes } from '/imports/api/balances/balance_incomes.js';

Meteor.startup(() => {
  prebuildAdmin();
  newUserId =   Accounts.createUser({
        username: "13810861287",
        password: "123456",
      });
  Meteor.users.update(newUserId, {
    $set:{
      profile: {
        mobile: "13810861287"
      }
    }
  })
});
