
import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';

import { Roles } from '/imports/api/roles/roles.js';

import { UserColumns } from '../table_columns/UserColumns.js'

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import message from 'antd/lib/message';
import 'antd/lib/message/style'

import { countMeteorUsers, getMeteorUsersLimit } from '../../services/users.js';
import { getAllRoles } from '../../services/roles.js';


import {getOneUser} from '/imports/ui/actions/current_deal_user.js';
import {getRoles} from '/imports/ui/actions/roles.js';


const confirm = Modal.confirm;

class Users extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      users: [],
      totalCount: 500,
      condition: {},
      currentPage: 1,
      loadingTip: "加载中...",
      tableLoading: true,
    }



  }
  banCard(userId){
    let self = this;
    Meteor.call("cards.delete.by.user", userId, function(err, rlt){
      if (!err) {
        if (rlt !== "USER DONT HAS ANY CARDS") {
          message.success('已经收回该用户卡片～');
          return self.getPageUsers(self.state.currentPage, 20, self.state.condition);
        }else{
          message.error('错误，该用户并没有卡片');
          return self.getPageUsers(self.state.currentPage, 20, self.state.condition);
        }

      }
    });
  }
  giveCard(userId){
    let self = this;
    Meteor.call("cards.give.by.user", userId, function(err, rlt){
      if (!err) {
        if (rlt !== "NOT CARDS AVILIBLE") {
          message.success('已经给出该用户卡片～');
          return self.getPageUsers(self.state.currentPage, 20, self.state.condition);
        }else{
          message.error('系统还没有卡给此用户');
          return self.getPageUsers(self.state.currentPage, 20, self.state.condition);
        }


      }
    });
  }
  deleteUser(userId){
    let self = this;
    const {dispatch }  = this.props;
    dispatch(getOneUser(null, ""));
    this.setState({
      tableLoading: true,
      loadingTip: "正在转移和清理用户数据，请稍后",
    })
    Meteor.call("users.remove", userId, function(err,rlt){
      if (!err) {
        if (rlt === 1) {
          message.success('该用户已经删除');
          return self.getPageUsers(self.state.currentPage, 20, self.state.condition);
        }else{
          message.error('出错');
          console.log(err);
          return self.getPageUsers(self.state.currentPage, 20, self.state.condition);
        }
      }
      self.setState({
        tableLoading: false,
        loadingTip: "加载中"
      })
    });
  }
  showConfirm(type, userId){
    let self = this;
    let confirmText = function(type){
      switch (type) {
        case "give":
          return {
            title: "授卡确认",
            content: "亲，您确实要把价值365元的万人车汇黑卡授予此用户吗?"
          }
          break;
        case "remove":
          return {
            title: "删除确认",
            content: "亲，您确实要永久删除此用户吗，操作不可逆转哦"
          }
        default:

          return {
            title: "禁止确认",
            content: "亲，您确实要把此用户的卡片停用吗?"
          }

      }
    }
    let confirmObj = confirmText(type)
    confirm({
     title: confirmObj.title,
     content: confirmObj.content,
     onOk() {
       //开始授权卡
       if (type === "give") {
         return self.giveCard(userId);
       }
       if (type === "ban") {
         return self.banCard(userId);
       }
       if (type === "remove") {
         return  self.deleteUser(userId);
       }


     },
     onCancel() {
       self.setState({
         loadingTip: "加载中......",
         tableLoading: false,
       });
     },
   });
  }
  bindJqueryEventForButtons(){
    //加载数据后开始授卡和解卡事件
    let self = this;

    $(".give-user-card ").unbind('click').on('click', function(){
      $(document).scrollTop(0);
      self.setState({
        tableLoading: true,
        loadingTip: "正在授卡......",
      })
      let userId = $(this).find('span').attr('data-id');
      self.showConfirm("give", userId);


    });
    $(".ban-user-card").unbind('click').on('click', function(){
      $(document).scrollTop(0);
      self.setState({
        tableLoading: true,
        loadingTip: "正在禁止......",
      });
      let userId = $(this).find('span').attr('data-id');
      self.showConfirm("ban", userId);


    });
  }
  componentDidMount(){
    const {dispatch }  = this.props;
    let self = this;
    console.log(self.state.condition);
    self.getPageUsers(1,20,this.state.condition);
    countMeteorUsers(function(err, rlt){
      if (!err) {
        self.setState({
          totalCount: rlt,
        });
      }

    });
    getAllRoles(function(err,rlt){
      if(!err){
        console.log(rlt)
        dispatch(getRoles(rlt))
      }
    });
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if (nextProps.CurrentDealUser.userId != null) {
      if (nextProps.CurrentDealUser.operaType === "remove") {
        this.showConfirm("remove", nextProps.CurrentDealUser.userId);
      }
    }
  }


  handleSearchInput(str){
    let condition = {
      $or: [
        {'profile.mobile': eval("/"+str+"/")},
        {username: eval("/"+str+"/")},
        {nickname:eval("/"+str+"/")}
      ]
    };
    // let condition ={status:"unpaid"}
    this.getPageUsers(1, 20, condition);
    this.setState({
      condition,
      currentPage: 1,
    });
    console.log(this.state.condition);


  }
  handlePageChange(page, pageSize){
    $(document).scrollTop(0);
    this.getPageUsers(page, pageSize, this.state.condition);
  }

  getPageUsers(page, pageSize, condition){
    let self = this;
    getMeteorUsersLimit(condition, page, pageSize, function(err, rlt){
      if (!err) {
        self.setState({
          users: rlt,
          tableLoading: false,
          currentPage: page,
        });
        self.bindJqueryEventForButtons();
      }
    })
  }




  render() {
      const headerMenuStyle ={
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-around',
        borderStyle: 'solid',
        padding: '15px',
        borderWidth: 'thin'
      };

    return (
      <div>
        <div style={headerMenuStyle}>
          <Input.Search
               placeholder="用户名｜电话｜昵称"
               style={{ width: '75%' }}
               onInput={input => this.handleSearchInput(input.target.value) }
              />
        </div>
        <Spin tip={this.state.loadingTip} spinning={this.state.tableLoading}>
          <Table dataSource={this.state.users} rowKey='_id'
           pagination={{defaultPageSize: 20, total: this.state.totalCount,
              onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
              showQuickJumper: true, current: this.state.currentPage
            }}
            columns={UserColumns} />
        </Spin>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
      CurrentDealUser: state.CurrentDealUser
   };
}

export default connect(mapStateToProps)(Users);
