
import { Meteor } from 'meteor/meteor';

function parseMobileAgencyExcel(excel){

}

var xlsx = require('node-xlsx');
var fs = require('fs');
const { URL } = require('url');
//各种服务端响应
HTTP.methods({
   '/excels/upload/mobile_agency': {
     post: function(file) {

       const workSheetsFromBuffer = xlsx.parse(file.toString('utf-8'));
       return workSheetsFromBuffer;
     }
 }
 });
