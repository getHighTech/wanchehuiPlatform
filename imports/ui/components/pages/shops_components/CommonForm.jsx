import React from "react";



import 'antd/lib/form/style';
import 'antd/lib/checkbox/style'


import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

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
import AMapSearcher from '../tools/AMapSearcher.jsx';
import "antd/lib/form/style";
import "antd/lib/icon/style";
import "antd/lib/input/style";
import "antd/lib/button/style";
import "antd/lib/checkbox/style";
import "antd/lib/tooltip/style";
import "antd/lib/time-picker/style";
import "antd/lib/select/style";
import "antd/lib/upload/style";

const FormItem = Form.Item;


import { Roles } from '/imports/api/roles/roles.js';
import { Shops } from '/imports/api/shops/shops.js';

class NormalCommonForm extends React.Component{
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    let self = this;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
            }
        else {
          self.props.shopInfo(fieldsValue);
      }
    })  
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
          sm: { span: 14 },
        },
      };
    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 60 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
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
      
      
    return(
        <Form onSubmit={this.handleSubmit}>
            <FormItem
            {...formItemLayout}
            label="店铺名称"
            hasFeedback
            >
            {getFieldDecorator('shopName', {
                rules: [{ required: true, message: '店铺名称不能为空' }],
            })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="店铺名称" />
            )}
            </FormItem>
            
            <FormItem
            {...formItemLayout}
            label="店铺电话"
            >
            {getFieldDecorator('shopPhone', {
                rules: [{ required: true, message: '填入手机号' }],
            })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">创建店铺</Button>
            </FormItem>
          </Form>
    );
  }
}

const CommonForm = Form.create()(NormalCommonForm);
export default CommonForm;
