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

import { AgencyColumns } from '../table_columns/AgencyColumns'

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import message from 'antd/lib/message';
import 'antd/lib/message/style';

import { getMeteorAgenciesLimit } from '../../services/agencies.js';
import { getUserIdsLimit } from '../../services/users.js';

const confirm = Modal.confirm;

class AgenciesRelations extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      agencies: [],
      totalCount: 220,
      condition: {},
      currentPage: 1,
      loadingTip: "加载中...",
      tableLoading: false,
      pageSize: 20,
    }
  }
  handleSearchInput(str){
    let condition = {
      $or: [
        {'profile.mobile': eval("/"+str+"/")},
        {username: eval("/"+str+"/")},
        {nickname:eval("/"+str+"/")}
      ]
    }
    this.setState({
      tableLoading:true
    });
    getUserIdsLimit(condition, 1, 20, (err, rlt)=>{
      if (!err) {
        this.setState({
          condition: {
            userId: {
              $in: rlt,
            }
          },
          tableLoading:false
        });
      }
      this.getPageAgencies(this.state.condition, 1, 20);
    });

  }

  componentDidMount(){

    this.getPageAgencies(this.state.condition, 1, 20);
    $(document).bind("select-user-id", function(e, id){
      //处理选择用户事件
      console.log(userId);
    })
  }


  changeSuperAgency(userId){
    console.log(userId);
    this.getPageAgencies(this.state.condition, this.state.currentPage, 20);
  }

  handlePageChange(page){
    this.setState({
      condition: {

      }
    })
    this.getPageAgencies(this.state.condition, page, this.state.pageSize);
  }

  getPageAgencies(condition, page, pageSize){
    this.setState({
      currentPage: page,
    });
    $(document).scrollTop(0);
    getMeteorAgenciesLimit(condition, page, pageSize, (err,rlt)=>{
      if (!err) {
        this.setState({
          agencies: rlt
        })
      }else{
        console.log(err);
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
               onInput={input => this.handleSearchInput(input.target.value) }
              />
        </div>
        <div className="agency-search-title"><h3 style={{textAlign: "center"}}>最近的代理链</h3></div>
        <Spin tip={this.state.loadingTip} spinning={this.state.tableLoading}>
          <Table dataSource={this.state.agencies} rowKey='_id'
          pagination={{defaultPageSize: 20, total: this.state.totalCount,
             onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
             showQuickJumper: true, current: this.state.currentPage
           }}
            columns={AgencyColumns} />
        </Spin>

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

      }
    });
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}}),

  };
}, connect(mapStateToProps)(AgenciesRelations));
