import { Meteor } from 'meteor/meteor';

import { Appointments } from './appointments.js';
import { Arrangements } from '../arrangements/arrangements.js';

Meteor.methods({
  'appointments.insert'(appoint) {
    //寻找该服务当天的时间安排
    let arrangement = Arrangements.findOne({
      serviceId: appoint.serviceId,
      type: "预约",date: appoint.date});
    if (arrangement == undefined) {
      //去做没有时间安排的服务业务

    }else{
      let new_limit = arrangement.availableTime[appoint.timeRangeIndex].limit - 1;
      if (new_limit < 0 ) {//判断是否爆满
        return 0;
      }
      arrangement.availableTime[appoint.timeRangeIndex].limit = new_limit;
      //更新预约最大限制值
      Arrangements.update(arrangement._id, {
        $set: {
          availableTime: arrangement.availableTime
        }
      });
    }


    return Appointments.insert({
      userId: Meteor.userId(),
      name:appoint.name,
      mobile:appoint.mobile,
      govNumber:appoint.govNumber,
      realName: appoint.realName,
      carNumber: appoint.carNumber,
      timeRangeIndex:appoint.timeRangeIndex,//此字段反应了其预约时段在当天的位置
      address: appoint.address,
      limit: appoint.limit,
      type: appoint.type,
      date: appoint.date,
      timeRange: appoint.timeRange,
      serviceId: appoint.serviceId,
      title: appoint.title,
      status: 'unconfirmed',
      createdAt: new Date()
    });
  },
  'appointments.update_status'(id, status){

    return Appointments.update(id, {
      $set: {
        status: status
      }
    });
  }
});
