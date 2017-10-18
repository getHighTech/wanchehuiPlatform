'use strict';

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

import { UserColumns } from '/imports/ui/static_data/UserColumns.js'

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

const confirm = Modal.confirm;

class Users extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      users: [],
      totalCount: 500,
      condition: {},
      currentPage: 0,
      loadingTip: "加载中...",
      tableLoading: true,
    }



  }
  showConfirm(userId){
    let self = this;
    confirm({
     title: '授卡确认',
     content: '亲，您确实要把价值365元的授予此用户吗?',
     onOk() {
       console.log(userId);
       self.setState({
         loadingTip: "加载中......",
         tableLoading: false,
       });
       
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

    $(".give-user-card ").on('click', function(){
      $(document).scrollTop(0);
      self.setState({
        tableLoading: true,
        loadingTip: "正在授卡......",
      });
      let userId = $(this).find('span').attr('data-id');
      self.showConfirm(userId);


    });
  }
  componentDidMount(){
    let self = this;
    self.getPageUsers(1,20,this.state.condition);
    Meteor.call('users.count', function(err,rlt){
      self.setState({
        totalCount: rlt,
      });
    });
  }


  handleSearchInput(str){
    let condition = {
      $or: [
        {'profile.mobile': eval("/"+str+"/")},
        {username: eval("/"+str+"/")},
        {nickname:eval("/"+str+"/")}
      ]
    };
    this.getPageUsers(1, 20, condition);
    this.setState({
      condition,
      currentPage: 1,
    });


  }
  handlePageChange(page, pageSize){
    $(document).scrollTop(0);
    this.getPageUsers(page, pageSize, this.state.condition);



  }

  getPageUsers(page, pageSize, condition){
    this.setState({
      tableLoading: true,
      loadingTip: "加载中...",
    });
    let self = this;
    Meteor.call("get.users.limit",condition, page-1, pageSize, function(err, rlt){
      if (!err) {
        self.setState({
          users: rlt,
          currentPage: page,
          tableLoading: false,
        });
        self.bindJqueryEventForButtons();
      }
    });
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
               onSearch={value => console.log(value)}
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

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current',{
      onReady: function(){
        console.log('roles.current ready')

      }
    });
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}}),

  };
}, connect(mapStateToProps)(Users));
