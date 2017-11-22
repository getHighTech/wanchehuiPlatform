import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Modal from 'antd/lib/modal';
import Tooltip from 'antd/lib/tooltip';
import TimePicker from 'antd/lib/time-picker';
import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/upload';
import "antd/lib/form/style";
import "antd/lib/icon/style";
import "antd/lib/input/style";
import "antd/lib/button/style";
import "antd/lib/checkbox/style";
import "antd/lib/tooltip/style";
import "antd/lib/time-picker/style";
import "antd/lib/select/style";
import "antd/lib/upload/style";
import 'antd/lib/modal/style';
import AMapSearcher from '../tools/AMapSearcher.jsx';
import { Roles } from '/imports/api/roles/roles.js';

const FormItem = Form.Item;


class ShopFormWrap extends Component {

    constructor(props){
      super(props);

    }

    state = {
      editdisable: false 
    }
    //初次挂载去获取数据
    componentWillMount(){
      //如果是新增店铺，清空表单

      //如果是编辑店铺，把获取的数据填进输入框里

    }


    componentDidMount(){

    }




    componentWillReceiveProps(nextProps){

    }
    render() {
      const { getFieldDecorator } = this.props.form;
      
      
          const formItemLayout = {
              labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
              },
            };
            const tailFormItemLayout = {
              wrapperCol: {
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 14,
                  offset: 6,
                },
              },
            };
      return (
        <Form onSubmit={this.handleSubmit}>
        <FormItem
        {...formItemLayout}
        label="店铺名称"
        hasFeedback
        >
        {getFieldDecorator('shopName', {
            rules: [{ required: true, message: '店铺名称不能为空' }],
        })(
            <Input className="shop-name-input" disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={this.props.shop.shopName} />
        )}
        </FormItem>

        <FormItem
        {...formItemLayout}
        label="店铺电话"
        >
        {getFieldDecorator('shopPhone', {
            rules: [{ required: true, message: '填入手机号' }],
        })(
            <Input  disabled={this.props.editState} style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label='地址'
        >
        {getFieldDecorator('shopAddress', {
            rules: [{ required: true, message: '输入店铺地址' }],
        })(
            <Input disabled={this.props.editState} style={{ width: '100%' }} />
        )}
        </FormItem>
      </Form>
      );
    }
  }

const ShopForm = Form.create()(ShopFormWrap);

export default ShopForm;
