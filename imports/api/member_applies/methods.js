import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MemberApplies } from './member_applies.js';

Meteor.methods({
  'member_applies.insert'(userId, column,value,status) {

    return MemberApplies.insert({
      userId,
      column,
      value,
      status,
      createdAt: new Date(),
    });
  },
  'member_profiles.checklist'(id){
  	//检查成为会员还缺啥
  	let checklist ={
  		realname: 0,
  		drive_card: 0,
  		drive_card_number: 0,
  		gov_id: 0,
  		gov_id_number: 0,
  		real_head_pic: 0,
  		birthday: 0,
  		gender: 0,
  		residence: 0,
  		screen_capture: 0,
  		assurance_bill: 0,
  		all: 0,
  	}

  	let all = 0;

  	let last_realname_apply = MemberApplies.find(
  		{userId: id, column: "realname"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_realname_apply != undefined) {
  		checklist.realname = last_realname_apply.status;
  		all = all+last_realname_apply.status;
  	}

  	let last_dirive_card_apply = MemberApplies.find(
  		{userId: id, column: "drive_card"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_dirive_card_apply != undefined ) {
  		checklist.last_dirive_card_apply = last_dirive_card_apply.status;
  		all = all+last_dirive_card_apply.status;
  	}
  	let last_drive_card_number_apply = MemberApplies.find(
  		{userId: id, column: "drive_card_number"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_drive_card_number_apply != undefined) {
  		checklist.drive_card_number = last_drive_card_number_apply.status;
  		all = all+last_drive_card_number_apply.status;
  	}
  	let last_gov_id_apply = MemberApplies.find(
  		{userId: id, column: "gov_id"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_gov_id_apply != undefined) {
  		checklist.gov_id = last_gov_id_apply.status;
  		all = all+last_gov_id_apply.status;
  	}
  	let last_gov_id_number_apply = MemberApplies.find(
  		{userId: id, column: "gov_id_number"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_gov_id_number_apply != undefined) {
  		checklist.gov_id_number = last_gov_id_number_apply.status;
  		all = all +last_gov_id_number_apply.status;
  	}
  	let last_real_head_pic_apply = MemberApplies.find(
  		{userId: id, column: "real_head_pic"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_real_head_pic_apply != undefined) {
  		checklist.real_head_pic = last_real_head_pic_apply.status;
  		all = all +last_real_head_pic_apply.status;
  	}
  	let last_birthday_apply = MemberApplies.find(
  		{userId: id, column: "birthday"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_birthday_apply != undefined) {
  		checklist.birthday = last_birthday_apply.status;
  		all = all +last_birthday_apply.status;
  	}
  	let last_gender_apply = MemberApplies.find(
  		{userId: id, column: "gender"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_gender_apply != undefined) {
  		checklist.gender = last_gender_apply.status;
  		all = all +last_gender_apply.status;
  	}
  	let last_residence_apply = MemberApplies.find(
  		{userId: id, column: "residence"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_residence_apply != undefined) {
  		checklist.residence = last_residence_apply.status;
  		all = all +last_residence_apply.status;
  	}
  	let last_screen_capture_apply = MemberApplies.find(
  		{userId: id, column: "screen_capture"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_screen_capture_apply != undefined) {
  		checklist.screen_capture = last_screen_capture_apply.status;
  		all = all +last_screen_capture_apply.status;
  	}
  	let last_assurance_bill_apply = MemberApplies.find(
  		{userId: id, column: "assurance_bill"},
  		{sort: {createdAt: -1}, limit: 1}
  		).fetch().pop();
  	if (last_assurance_bill_apply != undefined) {
  		checklist.assurance_bill = last_assurance_bill_apply.status;
  		all = all +last_assurance_bill_apply.status;
  	}
  	checklist.all = all;
  	return checklist;


  }

});
