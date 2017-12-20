
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

import {
  findOrCreateUserByMobile,checkUserHasCards,giveCardAndCouponsToUser,
} from '../api/users/actions.js'
import {
  findAgencyByUserIdAndProductId, findSuperAgencyByUserId, addNewAgency,findSuperAgencyById,
  findAgencyById, updateSuperAgency
} from '../api/agencies/actions.js'

import {
  findUserByAgencyId, findOrCreateAgencyByMobile
} from '../api/actions/agency_user.js';

import {
  addMountToUser
} from '../api/balances/actions.js'

var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');
const { URL } = require('url');
var formidable = require('formidable'),
http = require('http'),
util = require('util');

const accessKeyId = "LTAIMzirFnS118vy";
const accessKeySecret = "tPnXTfIPrjDDbLzM8qmetbjmRZE6E5";
//各种服务端响应
HTTP.methods({

  '/images/upload/handler': {
    post: function(buffer){
     
      let fs = require('fs');  
      let images = require("images");
      let filename = (new Date()).getTime().toString()+".png";
      let path = '/tmp/output'+filename;
    
      images(buffer).save(path, {operation:50});
      let ALY = require('aliyun-sdk');
      let ossStream = require('aliyun-oss-upload-stream')(new ALY.OSS({
        accessKeyId,
        secretAccessKey: accessKeySecret,
        endpoint: 'http://oss-cn-qingdao.aliyuncs.com',
        apiVersion: '2013-10-15'
      }));
      var upload = ossStream.upload({
        Bucket: 'wanchehui',
        Key: "textedit"+filename
      });
      // 可选配置
      upload.minPartSize(1048576); // 1M，表示每块part大小至少大于1M

      upload.on('error', function (error) {
        console.log('error:', error);
      });

      upload.on('part', function (part) {
        console.log('part:', part);
      });

      upload.on('uploaded', function (details) {
        var s = (new Date() - startTime) / 1000;
        console.log('details:', details);
        console.log('Completed upload in %d seconds', s);
      });

      var read = fs.createReadStream(path);
      read.pipe(upload);
      var startTime = new Date();
      return {
        "data":
        {
        "link":"http://wanchehui.oss-cn-qingdao.aliyuncs.com/"+"textedit"+filename,
        "title":"for editor",
        "status":200
        }
      };


    }
  },
  '/images/upload': {
    stream: true,
    post: function(){
      let form = new formidable.IncomingForm();
      form.uploadDir = '/tmp';
      form.multiples = true;
      let fileName = new Date().getTime() + '.png';
      form.parse(this.request, function(err, fields, files) {
        let filePath = '';
        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
        console.log(files)
        if(files.tmpFile){
            filePath = files.tmpFile.path;
        } else {
            for(var key in files){
                if( files[key].path && filePath==='' ){
                    filePath = files[key].path;
                    break;
                }
            }
        }
        console.log(filePath);
        let ALY = require('aliyun-sdk');
        let ossStream = require('aliyun-oss-upload-stream')(new ALY.OSS({
          accessKeyId,
          secretAccessKey: accessKeySecret,
          endpoint: 'http://oss-cn-qingdao.aliyuncs.com',
          apiVersion: '2013-10-15'
        }));
        var upload = ossStream.upload({
          Bucket: 'wanchehui',
          Key: fileName
        });
        // 可选配置
        upload.minPartSize(1048576); // 1M，表示每块part大小至少大于1M

        upload.on('error', function (error) {
          console.log('error:', error);
        });

        upload.on('part', function (part) {
          console.log('part:', part);
        });

        upload.on('uploaded', function (details) {
          var s = (new Date() - startTime) / 1000;
          console.log('details:', details);
          console.log('Completed upload in %d seconds', s);
        });

        var read = fs.createReadStream(filePath);
        read.pipe(upload);
        var startTime = new Date();
      });
      return {
        "data":
        {
        "link":"http://wanchehui.oss-cn-qingdao.aliyuncs.com/" + fileName,
        "title":"images_uploads",
        "status":200
        }
      };


    }
  },
   '/excels/upload/mobile_agency': {
     post: function(file) {

       const workSheetsFromBuffer = xlsx.parse(file);
       let users = workSheetsFromBuffer[0].data;
       let success = 0;
       let fail = users.length-6;
       messages = [];
       for (var i = 0; i < users.length-2; i++) {
         if (i>4) {
           let mobile = users[i][0];
           messages.push("<h2>处理"+mobile+"用户,要求其上级为"+users[i][1]+"</h2>");
           let rlt = findOrCreateUserByMobile(mobile);
           let dealUser = rlt.user;
           if (rlt.exists === true) {
             messages.push(mobile+"用户已经存在");
           }else{

             messages.push(mobile+"不存在，新建...");
             if (rlt.user) {
                messages.push(mobile+"用户新建成功...");
             }
           }
           if (checkUserHasCards(dealUser._id)) {
             messages.push(mobile+"用户已经有卡了，无需给予");
           }else{
             messages.push(mobile+"用户没有卡，正在给卡..");
             if (giveCardAndCouponsToUser(dealUser._id) == 1) {
               messages.push(mobile+"用户给卡成功！！！");
             }else{
               messages.push(mobile+"用户给卡失败！！！");

             }
           }
           //寻找此用户的代理
           let agency = findAgencyByUserIdAndProductId(dealUser._id, "Fky4pwxhcXZJrkdre");
           if (agency === undefined) {
             messages.push(mobile+"用户没有代理权，正在授权～");
             let insertRst = addNewAgency(dealUser._id, "Fky4pwxhcXZJrkdre");
             if (insertRst) {
               messages.push(mobile+"用户代理授权成功");
               agency = findAgencyById(insertRst);
             }else{
                messages.push(mobile+"用户代理授权失败");
             }

           }else{

             messages.push(mobile+"用户有代理权，继续.......");
           }
           messages.push("正在寻找"+mobile+"的上级代理");

           let superAgency = findSuperAgencyById(agency._id);
           if (superAgency) {
             let superUser = findUserByAgencyId(superAgency._id);
             messages.push(mobile+"的上级代理已存在");
             if (superUser.profile.mobile == users[i][1].toString()) {
               messages.push(mobile+"的上级代理和文档提供的一样，等待收入对账查询");
             }else{
               messages.push(mobile+"的上级代理和文档提供的不一样，开始更新其上级代理");
             }

           }else{
             messages.push(mobile+"没有上级代理，开始按资料插入上级代理");
           }

           let agencyUserMobile = users[i][1];
           superAgency = findOrCreateAgencyByMobile(agencyUserMobile, "Fky4pwxhcXZJrkdre");
           updateSuperAgency(agency._id, superAgency._id);

           //先记账，再各个人的账户

          let superUser = findOrCreateUserByMobile(agencyUserMobile);
          if (superUser.exists) {
            messages.push(agencyUserMobile+"用户是存在的");
          }else{
            messages.push(agencyUserMobile+"用户是不存在的，创建");
          }

          if (superUser.user.cards == undefined) {
            messages.push(agencyUserMobile+"没有卡,要给他卡");
            if (giveCardAndCouponsToUser(superUser.user._id) == 1) {
              messages.push(agencyUserMobile+"用户给卡成功！！！");
            }else{
              messages.push(agencyUserMobile+"用户给卡失败！！！");
            }

          }

           addMountToUser(superUser.user._id, 3880);
           messages.push(agencyUserMobile+"有38.80的收入记账,对记录进行合账");

         }
       }
       return {
         found: users.length -6,
         messages,
         success,
         fail,
       }

     }
 }
 });
