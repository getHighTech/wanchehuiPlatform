import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { allUsersMount,
        allCardUsersMount,
        getLimitUserIds,
        getBasicUserById,
        getUserByAgencyId,
      } from './actions.js';

Meteor.methods({
  'user.role'() {
    if (!Meteor.user()) {

      return [];
    }
    return Meteor.user().roleId;
  },
  'users.count'(){
    return allUsersMount();
  },
  'users.cards.count'(){
    return allCardUsersMount();
  },

  'get.userIds.limit'(condition, page, pageSize){
    return getLimitUserIds(condition, page, pageSize);
  },
  'get.users.limit'(condition={},page=1, pageSize=20){
    let users =  Meteor.users.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'cards': 1,
          'carnumber': 1,
        }
      }
    );
    return users.fetch();
  },
  'get.user.id'(userId){
    return getBasicUserById(userId);
  },
  "get.user.agencyId"(agencyId){
    return getUserByAgencyId(agencyId);
  }


});
