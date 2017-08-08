
import { Meteor } from 'meteor/meteor';
import { Appointments } from '../appointments.js';

Meteor.publish('appointments.overtime', function(serviceId){
  let dd = new Date();
  let appointments = Appointments.find({
    $and:[
      {limit:{$lt: dd} },
      {status: {$ne: "overtime"}},
      {serviceId, serviceId}
    ]
  }, {sort: {createdAt: -1}});

  if (appointments.count() != 0) {
    //将过去没有被标记过期的，统统标记过期
    for (var i = 0; i < appointments.fetch().length; i++) {
      Appointments.update(appointments.fetch()[i]._id, {
        $set: {
          status: "overtime"
        }
      });
    }
  }
  return Appointments.find({status: 'overtime'});
});

Meteor.publish('appointments.all', function(serviceId){
  return Appointments.find({serviceId});
});
Meteor.publish('get.appointments.bystatus', function(status){
  return Appointments.find({status});
});
Meteor.publish('get.appointments.userid', function(id){
  //用户名的所有
  return Appointments.find({userId: id},{sort:{createdAt:-1}});
});
Meteor.publish('get.appointment.id', function(id){
  //一个预约
  return Appointments.find({_id: id});
});
