import { Meteor } from 'meteor/meteor';
import {Arrangements} from '../arrangements.js'
import { Services } from '../../services/services.js'

Meteor.publish('arrangements.get_counter_title', function(date, title){
  if (Arrangements.find(
    {$and: [{serviceName: '柜台业务'}, {title: title}, {date: date}] },
    {sort: {createdAt: -1}}
  ).count() == 0) {//若是这个date的排班不存在，则新建一个

    let service = Services.findOne({name: "柜台业务", title: title});

    Arrangements.insert({
      serviceName: "柜台业务",
      type: "预约",
      title: title,
      serviceId: service._id,
      date,
      availableTime: [
        {
          dayTime: '9:00-10:00',
          timeOff: '10:00',
          limit: 4,
        },
        {
          dayTime: '10:00-11:00',
          timeOff: '11:00',
          limit: 4,
        },
        {
          dayTime: '11:00-12:00',
          timeOff: '12:00',
          limit: 4,
        },
        {
          dayTime: '13:00-14:00',
          timeOff: '14:00',
          limit: 4,
        },
        {
          dayTime: '14:00-15:00',
          timeOff: '15:00',
          limit: 4,
        },
        {
          dayTime: '15:00-16:00',
          timeOff: '16:00',
          limit: 4,
        },
        {
          dayTime: '16:00-17:00',
          timeOff: '17:00',
          limit: 4,
        },
        {
          dayTime: '17:00-18:00',
          timeOff: '18:00',
          limit: 4,
        }
      ]
    });
  }
  
  return Arrangements.find(
    {$and: [{serviceName: '柜台业务'}, {title: title}, {date}] },
    {sort: {createdAt: -1}}
  );
});
