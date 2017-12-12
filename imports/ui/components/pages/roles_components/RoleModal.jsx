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
      shopPermission:[],
      orderPermission:[],
      userPermission:[],
      rolePermission:[],
      distributionPermission:[]
  }


  handleModalOk = (e) => {
    let self = this
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
    if (!err) {
        const oldFormData = form.getFieldsValue();
        console.log(oldFormData.roleName)
        //处理收到的表单的数据
        const newObj = {}
        newObj.roleName = oldFormData.roleName
        //先去数据库查询角色标识，如果数据库里有就返回错误，等待编码
        newObj.tagName = oldFormData.tagName
        newObj.permission = self.state
        console.log(newObj)
      }else{
        message.error('表格参数有误，提交失败');
      }
    });
  }



  handleCancel = (e) => {
    this.props.onCancel()
  }
  shopOnChange(checkedValues) {
    this.setState({
      shopPermission: checkedValues,
    });
    console.log(this.state.shopPermission );
    
  }
  orderOnChange(checkedValues) {
    this.setState({
      orderPermission: checkedValues,
    });
    console.log(this.state.orderPermission );
  }
  userOnChange(checkedValues) {
    this.setState({
      userPermission: checkedValues,
    });
    console.log(this.state.userPermission );
  }
  roleOnChange(checkedValues) {
    this.setState({
      rolePermission: checkedValues,
    });
    console.log(this.state.rolePermission );
  }
  distributionOnChange(checkedValues) {
    this.setState({
      distributionPermission: checkedValues,
    });
    console.log(this.state.distributionPermission );
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
      { label: '新增', value: 'shopRead' },
      { label: '修改', value: 'shopUpdate' },
      { label: '查看', value: 'shopShow' },
      { label: '删除', value: 'shopDelete',disabled: true },
    ];
    const orderOptions = [
      { label: '新增', value: 'orderRead' },
      { label: '修改', value: 'orderUpdate' },
      { label: '查看', value: 'orderShow' },
      { label: '删除', value: 'orderDelete',disabled: true },
    ];
    const userOptions = [
      { label: '新增', value: 'userRead' },
      { label: '修改', value: 'userUpdate' },
      { label: '查看', value: 'userShow' },
      { label: '删除', value: 'userDelete',disabled: true },
    ];    
    const roleOptions = [
      { label: '新增', value: 'roleRead' },
      { label: '修改', value: 'roleUpdate' },
      { label: '查看', value: 'roleShow' },
      { label: '删除', value: 'roleDelete',disabled: true },
    ];
    const distributionOptions = [
      { label: '新增', value: 'distributionRead' },
      { label: '修改', value: 'distributionUpdate' },
      { label: '查看', value: 'distributionShow' },
      { label: '删除', value: 'distributionDelete',disabled: true },
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
                {getFieldDecorator('shopPermission', {
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
                {getFieldDecorator('orderPermission', {
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
                {getFieldDecorator('userPermission', {
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
                {getFieldDecorator('rolePermission', {
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
                {getFieldDecorator('distributionPermission', {
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
