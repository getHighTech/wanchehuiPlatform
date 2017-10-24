'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { Roles } from '/imports/api/roles/roles.js';

import { ShopColumns } from '/imports/ui/static_data/ShopColumns.js'


import AddModal from './shops_components/AddModal.jsx';

class Shops extends React.Component{
  constructor(props) {
    super(props);

  }

  handleSearchInput(value){

    console.log(value);
  }





  render() {

    const dataSource = [
        {
            key: '1',
            cover: "/img/h_icon.png",
            name: '小李维修站',
            address: "成都市黄泉9路13号",
            mobile: "1344444444"
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
          <AddModal />
          <div>
          <Input.Search
               placeholder="搜索店铺相关"
               style={{ width: 200 }}
               onSearch={value => console.log(value)}
               onInput={input => this.handleSearchInput(input.target.value) }
              />
          </div>
        </div>

        <Table dataSource={dataSource} columns={ShopColumns} />
      
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
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(Shops));
