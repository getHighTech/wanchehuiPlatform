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

import { AgenciesColumns } from '/imports/ui/static_data/AgencyColumns'

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import message from 'antd/lib/message';
import 'antd/lib/message/style';

import { getMeteorAgenciesLimit } from '../../services/agencies.js';

const confirm = Modal.confirm;

class AgenciesRelations extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      users: [],
      totalCount: 0,
      condition: {},
      currentPage: 1,
      loadingTip: "加载中...",
      tableLoading: false,
    }



  }

  render() {
      const dataSource = [
        {
            key: "12",
            createdAt: "2012-123",
            user: '小李维修站',
            sudperAgency: "成都市黄泉9路13号",
            lowerAgency: "1344444444"
        }
      ];
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
          <Table dataSource={dataSource} rowKey='key'
           pagination={{defaultPageSize: 20, total: this.state.totalCount,
              onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
              showQuickJumper: true, current: this.state.currentPage
            }}
            columns={AgenciesColumns} />
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
  if (Meteor.userId()) {AgenciesRelations
    Meteor.subscribe('roles.current',{
      onReady: function(){

      }
    });
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}}),

  };
}, connect(mapStateToProps)(AgenciesRelations));
