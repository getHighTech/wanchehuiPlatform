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

import { SelectUserColumns } from '../../table_columns/UserColumns.js'


class UserFinder extends React.Component{
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

  selectUserIdByJquery(){
    let self = this;
    $('.select-user-id').unbind('click').on('click', function(){
      let userId = $(this).attr('data-id');
      console.log(userId);
      console.log(self.props.extraBackData);
      self.props.selectClose();
    })
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
    let self = this;
    Meteor.call("get.users.limit",condition, page, pageSize, function(err, rlt){
      if (!err) {
        self.setState({
          users: rlt,
          tableLoading: false,
          currentPage: page,
        });
        self.selectUserIdByJquery();
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
        <Spin tip={this.state.loadingTip} spinning={this.state.tableLoading}>
          <Table dataSource={this.state.users} rowKey='_id'
           pagination={{defaultPageSize: 10, total: this.state.totalCount,
              onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
              showQuickJumper: true, current: this.state.currentPage
            }}
            columns={SelectUserColumns} />
        </Spin>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(UserFinder);
