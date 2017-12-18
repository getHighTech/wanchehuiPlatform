'use strict';

import React from "react";
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Switch from 'antd/lib/switch';
import "antd/lib/switch/style";
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import RoleModal from './roles_components/RoleModal.jsx';
import Divider from 'antd/lib/divider';
import 'antd/lib/divider/style'
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style'
import {countRoles,getMeteorRolesLimit} from '../../services/roles.js'




class Roles extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalVisible: false,
      modalTitle:"",
      rolesData:[],
      condition:{},
      totalCount:'',
      singleRole:{},
      modalInsert: true,
      defaultOperationValue1:[],
      defaultOperationValue2:[],
      defaultOperationValue3:[],
      defaultOperationValue4:[],
      defaultOperationValue5:[]
    }

  }

  onClickInsert = () => {
    this.setState({
      singleRole: {},
      modalVisible: true,
      modalTitle:"新建一个角色",
      modalInsert: true,
      defaultOperationValue1:[],
      defaultOperationValue2:[],
      defaultOperationValue3:[],
      defaultOperationValue4:[],
      defaultOperationValue5:[]
    });
  }
  refleshTable(){
    this.getPageRoles(1,20,this.state.condition);
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  getPageRoles(page,pageSize,condition){
    let self = this
    Meteor.call('get.roles.limit',condition,page,pageSize, function(err,rlt){
      if(!err){
        console.log(rlt)
        self.setState({
          rolesData: rlt
        })
      }
      console.log(self.state.rolesData)
    })
  }
  countRoles(){

  }

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  componentWillMount(){
    console.log(this.state.condition);
    this.getPageRoles(1,20,this.state.condition);
    countRoles(function(err, rlt){
      if (!err) {
        self.setState({
          totalCount: rlt,
        });
      }
    })
  }
  onClickUpdate(roleId){
    console.log(roleId)
    let self = this
    Meteor.call('role.findById', roleId, function(err,rlt){
      if(!err){
        self.setState({
          singleRole: rlt,
          modalVisible: true,
          modalTitle:"编辑角色",
          modalInsert: false,
          defaultOperationValue1:self.objToArry(rlt,"shops"),
          defaultOperationValue2:self.objToArry(rlt,"orders"),
          defaultOperationValue3:self.objToArry(rlt,"users"),
          defaultOperationValue4:self.objToArry(rlt,"roles"),
          defaultOperationValue5:self.objToArry(rlt,"distributions"),
        })
        console.log(self.state)
      }
    })
  }

  isEmptyObject(obj){
    for (var key in obj) {
      return false;
      }
      return true;
  }

  objToArry(obj,str){
    console.log(obj)
    let self = this
    let arr = []
    if(!self.isEmptyObject(obj)){
      console.log(obj.permissions[str])
      for(var i in obj.permissions[str]){
        arr.push(i)
      }
      console.log(arr)
      console.log('非空对象')
      return arr
    }
  }
  showRoleUsers(){

  }
  showChangeConfirm(){

  }
  render() {
    const dataSource = this.state.rolesData
    
    const columns = [{
      title: '角色名字',
      dataIndex: 'name_zh',
      key: 'name_zh',
    }, {
      title: '角色标识',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '角色权限',
      key: 'permissions',
      render: (text, record) => (
        <span>
          <Tooltip placement="topLeft" title="修改角色权限" arrowPointAtCenter>
            <Button shape="circle" icon="edit"  onClick={ () => this.onClickUpdate(record._id)}></Button>
          </Tooltip>
        </span>
      ),
    },
    {
      title: '查看角色用户',
      key: 'show',
      render: (text, record) => (
        <span>
          <Tooltip placement="topLeft" title="查看用户角色" arrowPointAtCenter>
            <Button shape="circle" icon="eye"  onClick={() => this.showRoleUsers(record._id)}  ></Button>
          </Tooltip>
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Tooltip placement="topLeft" title="增加新角色" arrowPointAtCenter>
              <Switch checkedChildren="已启用" unCheckedChildren="已禁用" defaultChecked={!record.state} onChange={() => this.showChangeConfirm(record.state,record._id)}  />
          </Tooltip>
        </span>
      ),
    }];
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
          <Tooltip placement="topLeft" title="增加新角色" arrowPointAtCenter>
            <Button shape="circle" icon="plus"  onClick={this.onClickInsert}  style={{fontSize: "18px", color: "red"}} ></Button>
          </Tooltip>
          <RoleModal 
          modalVisible={this.state.modalVisible}
          modalTitle={this.state.modalTitle}
          onCancel = { this.hideModal}
          refleshTable = {this.refleshTable.bind(this)}
          ref = {(input) => { this.fromModal = input; }}
          singleRole = {this.state.singleRole}
          modalInsert = {this.state.modalInsert}
          defaultOperationValue1 = {this.state.defaultOperationValue1}
          defaultOperationValue2 = {this.state.defaultOperationValue2}
          defaultOperationValue3 = {this.state.defaultOperationValue3}
          defaultOperationValue4 = {this.state.defaultOperationValue4}
          defaultOperationValue5 = {this.state.defaultOperationValue5}
          />
        </div>
        <Table rowKey={record => record._id} dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Roles);
