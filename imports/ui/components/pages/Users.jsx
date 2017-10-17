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


import AddModal from './shops_components/AddModal.jsx';

class Users extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      users: []
    }
    Meteor.subscribe('users.limit', 0, 20, {
      onReady: function(){
        self.setState({
          users: Meteor.users.find({}, {
            skip: 0, limit: 20, sort: {createdAt: -1}
          }).fetch()
        });
      }
    })

  }


  handleSearchInput(value){

    console.log(value);
  }
  handlePageChange(page, pageSize){
    let self = this;
    $(document).scrollTop(0);
    Meteor.subscribe('users.limit', page-1, 20, {
      onReady: function(){
        let users = Meteor.users.find({}, {
          skip: (page-1)*pageSize, limit: pageSize, sort: {createdAt: -1}
        }).fetch();
        self.setState({
          users,
        })
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
          <AddModal />
          <div>
          <Input.Search
               placeholder="搜索用户相关"
               style={{ width: 200 }}
               onSearch={value => console.log(value)}
               onInput={input => this.handleSearchInput(input.target.value) }
              />
          </div>
        </div>

        <Table dataSource={this.state.users} rowKey='_id'
         pagination={{defaultPageSize: 20, total: 2000,
            onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
            showQuickJumper: true,
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
