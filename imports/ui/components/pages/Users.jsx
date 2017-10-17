'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { Roles } from '/imports/api/roles/roles.js';

import { UserColumns } from '/imports/ui/static_data/UserColumns.js'

class Users extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      users: [],
      totalCount: 500,
      condition: {},
      currentPage: 0,
    }



  }
  componentDidMount(){
    let self = this;
    Meteor.subscribe('users.limit', 0, 20, {
      onReady: function(){
        self.setState({
          users: Meteor.users.find({}, {
            skip: 0, limit: 20, sort: {createdAt: -1}
          }).fetch()
        });


      }
    });
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
    this.getPageUsers(0, 20, condition);
    this.setState({
      condition,
      currentPage: 1,
    });


  }
  handlePageChange(page, pageSize){
    let self = this;
    this.getPageUsers(page, pageSize, this.state.condition);

    $(document).scrollTop(0);
  }

  getPageUsers(page, pageSize, condition){
    let self = this;
    Meteor.call("get.users.limit",condition, page, pageSize, function(err, rlt){
      if (!err) {
        self.setState({
          users: rlt,
          currentPage: page,
        });
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

        <Table dataSource={this.state.users} rowKey='_id'
         pagination={{defaultPageSize: 20, total: this.state.totalCount,
            onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
            showQuickJumper: true, current: this.state.currentPage
          }}
          columns={UserColumns} />
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
