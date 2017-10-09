'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { Roles } from '/imports/api/roles/roles.js';


import AddModal from './shops_components/AddModal.jsx';

class Shops extends React.Component{
  constructor(props) {
    super(props);

  }

  handleSearchInput(value){

    console.log(value);
  }





  render() {
    const actionStyle = {
       fontSize: 16, color: '#08c'
    };
    const dataSource = [
        {
            key: '1',
            cover: "/img/h_icon.png",
            name: '小李维修站',
            address: "成都市黄泉9路13号",
            mobile: "1344444444"
        }
      ];

        const columns = [
          {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            render: text => <img style={{width: '60px'}} src={text} />,
          },
          {
          title: '店名',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
        }, {
          title: '联系电话',
          dataIndex: 'mobile',
          key: 'mobile',
        },{
          title: '创建时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: '创建人',
          dataIndex: 'byUser',
          key: 'byUser',
        },
        {
          title: '最后更改',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: "最后更改人",
          dataIndex: 'updatedBy',
          key: 'updatedBy'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Tooltip placement="topLeft" title="查看详情" arrowPointAtCenter>
                <Button shape="circle" icon="eye"  style={actionStyle} />
              </Tooltip>
              <span className="ant-divider" />
              <Tooltip placement="topLeft" title="删除此记录" arrowPointAtCenter>
                <Button shape="circle" icon="delete"  style={actionStyle} />
              </Tooltip>
              <span className="ant-divider" />
              <Tooltip placement="topLeft" title="编辑此记录" arrowPointAtCenter>
                <Button shape="circle" icon="edit"  style={actionStyle} />
              </Tooltip>

            </span>
          ),
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

        <Table dataSource={dataSource} columns={columns} />
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
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(Shops));
