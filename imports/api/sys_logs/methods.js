import {SysLogs} from './sys_logs.js';

Meteor.methods({
  "sys_logs.limit"(condition={}, page=1, pagesize=20){
    let logs =  SysLogs.find(condition, {
      skip: (page-1)*pagesize, limit: pagesize,
      sort: {"createdAt": -1},
      fields:
        {
          'type': 1,
          'text': 1,
          'level': 1,
          'createdAt': 1,
          'note': 1,
        }
      }
    );

    return  logs.fetch();

  }
  "sys_logs.count"(){
    return SysLogs.find().count();
  }
});
