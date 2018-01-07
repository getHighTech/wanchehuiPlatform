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
import UserModal from './roles_components/UserModal.jsx';
// import Divider from 'antd/lib/divider';
// import 'antd/lib/divider/style'
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
      condition:{name: {$ne:"superAdmin"}},
      totalCount:'',
      singleRole:{},
      modalInsert: true,
      userModalVisible:false,
      currentPage: 1,
      userDatas:[]
    }

  }

  onClickInsert = () => {
    this.setState({
      singleRole: {},
      modalVisible: true,
      modalTitle:"新建一个角色",
      modalInsert: true
    });

    this.fromModal.resetFields({});
  }

  refleshTable(){
    this.getPageRoles(1,20,this.state.condition);
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  getPageRoles(page,pageSize,condition){
    let self = this
    Meteor.call('get.roles.limit',condition,page,pageSize, function(err,rlt){
      if(!err){
        self.setState({
          rolesData: rlt,
          currentPage:page
        })
      }
    })
  }
 

  hideModal = () => {
    this.setState({modalVisible: false});
  };
  hideUserModal = () => {
    this.setState({userModalVisible: false});
  };
  componentWillMount(){
    let self = this
    this.getPageRoles(1,20,this.state.condition);
    countRoles(function(err, rlt){
      if (!err) {
        self.setState({
          totalCount: rlt,
        });
      }
    })
  }
  componentDidMount(){
  }
  onClickUpdate(roleId){
    let self = this
    Meteor.call('role.findById', roleId, function(err,rlt){
      if(!err){
        self.setState({
          singleRole: rlt,
          modalVisible: true,
          modalTitle:"编辑角色",
          modalInsert: false
        })
      }
    })
  }
  //将角色单条数据处理成表单可以显示的数据
  transformRawDataToForm(obj) {
    const newObj = {};
    for (const key in obj) {
      // rawData中可能有些undefined或null的字段, 过滤掉
      if (!obj[key])
        continue;
      if(key=="permissions"){
        //处理权限对象字段
        for (const key in obj["permissions"]){
          let arr = [];
            for(const i in obj["permissions"][key]){
                arr.push(i);
            }
          newObj[key] = arr
        }
        
      }else{
        newObj[key] = obj[key];
      }
      
    }
    return newObj;
  }

  setFormData(data) {
    // 注意这里, 由于antd modal的特殊性, yhis.props.form可能是undefined, 要判断一下
    if (this.formComponent) {
      this.formComponent.resetFields();
      if (data) {
        this.formComponent.setFieldsValue(data);
      }
    }
  }

  handlePageChange(page, pageSize){
    $(document).scrollTop(0);
    this.getPageRoles(page, pageSize, this.state.condition);
  }

  // showRoleUsers(roleId){
  //   let self = this
  //   Meteor.call('role.findById', roleId, function(err,rlt){
  //     if(!err){
  //       self.setState({
  //         singleRole: rlt,
  //         userModalVisible: true
  //       })
  //     }
  //   })
  // }
  showRoleUsers(roleId){
    let self = this
    console.log(roleId)
    Meteor.call('users.find_by_role_id',roleId,function(err,rlt){
      if(!err){
        console.log(rlt)
        self.setState({
          userModalVisible:true,
          userDatas:rlt
        })
      }
    })
  }
  showChangeConfirm(roleState,roldId){
    Meteor.call('role.toggleState',roleState,roldId,function(err,rlt){
      if(!err){
        console.log(rlt)
      }
    })
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
              <Switch checkedChildren="已启用" unCheckedChildren="已禁用" defaultChecked={record.state} onChange={() => this.showChangeConfirm(record.state,record._id)}  />
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
          />
          <UserModal
            userModalVisible = {this.state.userModalVisible}
            onCancel = { this.hideUserModal }
            userDatas = {this.state.userDatas}
            singleRole = {this.state.singleRole}
          />
        </div>
        <Table 
        rowKey={record => record._id} 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          defaultPageSize: 20,
          total: this.state.totalCount,
          onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
          current: this.state.currentPage
        }}
        />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Roles);
