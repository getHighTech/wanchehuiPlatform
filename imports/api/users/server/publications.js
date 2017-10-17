import { Meteor } from 'meteor/meteor';

Meteor.publish('user.list.one', function(){

return Meteor.users.find(
  {_id: this.userId},
  {

    sort: {createdAt: -1},
    fields:
      {
        'roles': 1,
        'profile': 1,
        'username': 1,
        'createdAt': 1,
        'member_status': 1,
        'coupons': 1,
        'fansCount': 1,
        'cards': 1,
      }
    }
  );
});

Meteor.publish('users.limit', function(page=0, pagesize=20){
  return Meteor.users.find({}, {
    skip: page*pagesize, limit: pagesize,
    sort: {createdAt: -1},
    fields:
      {
        'roles': 1,
        'profile': 1,
        'username': 1,
        'createdAt': 1,
        'member_status': 1,
        'coupons': 1,
        'fansCount': 1,
        'cards': 1,
      }
    }
  );
});
