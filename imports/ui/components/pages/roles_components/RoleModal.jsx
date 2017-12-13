import React from "react";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from '/imports/api/roles/roles.js';
import { Shops } from '/imports/api/shops/shops.js';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import "antd/lib/table/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import 'antd/lib/message/style';


import 'antd/lib/form/style';
import 'antd/lib/checkbox/style'
import Divider from 'antd/lib/divider';
import 'antd/lib/divider/style'

const FormItem = Form.Item;
class RoleModalWrap extends React.Component {
  constructor(props){
    super(props);
    
  }
  state = {
        shops:{},
        orders:{},
        users:{},
        roles:{},
        distributions:{}
  }
  handleModalOk = (e) => {
    let self = this
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
    if (!err) {
        const oldFormData = form.getFieldsValue();
        console.log(oldFormData)
        //处理收到的表单的数据
        const newObj = {}
        newObj.roleName = oldFormData.roleName
        //先去数据库查询角色标识，如果数据库里有就返回错误，等待编码
        
        newObj.tagName = oldFormData.tagName
        newObj.permission = self.state
        console.log(newObj)
        Meteor.call('role.insert',newObj,function(err,rlt){
          if(!err){
            console.log("角色添加成功");
            console.log(rlt)
            self.hideModal();
          }
        })
        
      }else{
        message.error('表格参数有误，提交失败');
      }
    });
  }

  hideModal = () => {
    this.props.onCancel();
  };


  handleCancel = (e) => {
    this.props.onCancel()
  }
  shopOnChange(checkedValues) {
    let shops = {}
    for(let i in checkedValues){
      shops[checkedValues[i]] = true
    }
    this.setState({
      shops: shops,
    });
    console.log(this.state.shops );
  }
  orderOnChange(checkedValues) {
    let orders = {}
    for(let i in checkedValues){
      orders[checkedValues[i]] = true
    }
    this.setState({
      orders: orders,
    });
    console.log(this.state.orders );
  }
  userOnChange(checkedValues) {
    let users = {}
    for(let i in checkedValues){
      users[checkedValues[i]] = true
    }
    this.setState({
      users: users,
    });
    console.log(this.state.users );
  }
  roleOnChange(checkedValues) {
    let roles = {}
    for(let i in checkedValues){
      roles[checkedValues[i]] = true
    }
    this.setState({
      roles: roles,
    });
    console.log(this.state.roles );
  }
  distributionOnChange(checkedValues) {
    let distributions = {}
    for(let i in checkedValues){
      distributions[checkedValues[i]] = true
    }
    this.setState({
      distributions: distributions,
    });
    console.log(this.state.distributions );
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const checkoutStyle = {
      paddingTop: 9
    };
    const CheckboxGroup = Checkbox.Group;
    const shopOptions = [
      { label: '新增', value: 'readable' },
      { label: '修改', value: 'updatable' },
      { label: '查看', value: 'showable' },
      { label: '删除', value: 'deletable',disabled: true },
    ];
    const orderOptions = [
      { label: '新增', value: 'readable' },
      { label: '修改', value: 'updatable' },
      { label: '查看', value: 'showable' },
      { label: '删除', value: 'deletable',disabled: true },
    ];
    const userOptions = [
      { label: '新增', value: 'readable' },
      { label: '修改', value: 'updatable' },
      { label: '查看', value: 'showable' },
      { label: '删除', value: 'deletable',disabled: true },
    ];    
    const roleOptions = [
      { label: '新增', value: 'readable' },
      { label: '修改', value: 'updatable' },
      { label: '查看', value: 'showable' },
      { label: '删除', value: 'deletable',disabled: true },
    ];
    const distributionOptions = [
      { label: '新增', value: 'readable' },
      { label: '修改', value: 'updatable' },
      { label: '查看', value: 'showable' },
      { label: '删除', value: 'deletable',disabled: true },
    ];

    return (
      <div>
        <Modal
          title={this.props.modalTitle}
          visible={this.props.modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleCancel.bind(this)}
        >
          <div>
            <Form>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    角色名称&nbsp;
                    <Tooltip title="简单描述一下该角色">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('roleName', {
                  rules: [{ required: true, message: '角色名称为必填项目', whitespace: true }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    英文标识&nbsp;
                    <Tooltip title="英文标识必须为唯一的">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('tagName', {
                  rules: [{ required: true, message: '角色标识为必填项目', whitespace: true }],
                })(
                  <Input />
                )}
              </FormItem>
              <Divider>为该角色添加以下权限</Divider>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    店铺权限
                  </span>
                )}
              >
                {getFieldDecorator('shops', {
                  rules: [],
                })(
                  <div style={checkoutStyle}>
                    <CheckboxGroup options={shopOptions}  onChange={this.shopOnChange.bind(this)} />
                  </div>
                  
                )}
              </FormItem>              
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    订单权限
                  </span>
                )}
              >
                {getFieldDecorator('orders', {
                  rules: [],
                })(
                  <div style={checkoutStyle}>
                    <CheckboxGroup options={orderOptions}  onChange={this.orderOnChange.bind(this)} />
                  </div>
                  
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    用户权限
                  </span>
                )}
              >
                {getFieldDecorator('users', {
                  rules: [],
                })(
                  <div style={checkoutStyle}>
                    <CheckboxGroup options={userOptions}  onChange={this.userOnChange.bind(this)} />
                  </div>
                  
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    角色权限
                  </span>
                )}
              >
                {getFieldDecorator('roles', {
                  rules: [],
                })(
                  <div style={checkoutStyle}>
                    <CheckboxGroup options={roleOptions}  onChange={this.roleOnChange.bind(this)} />
                  </div>
                  
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    分销关系权限
                  </span>
                )}
              >
                {getFieldDecorator('distributions', {
                  rules: [],
                })(
                  <div style={checkoutStyle}>
                    <CheckboxGroup options={distributionOptions}  onChange={this.distributionOnChange.bind(this)} />
                  </div>
                  
                )}
              </FormItem>

            </Form>
          </div>
        </Modal>
      </div>
    )
  }

}

const RoleModal = Form.create()(RoleModalWrap);

export default RoleModal;
