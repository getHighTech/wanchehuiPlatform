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

import {shopFormInput} from '/imports/ui/actions/shop_form.js';
import { Roles } from '/imports/api/roles/roles.js';
import { Shops } from '/imports/api/shops/shops.js';

class NormalCommonForm extends React.Component{
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    let self = this;
    
    e.preventDefault();
    const {dispatch, ShopForm} = this.props;　
    this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
            }
        else {
          self.props.shopInfo(fieldsValue);
          dispatch(shopFormInput(fieldsValue.shopPhone, fieldsValue.shopName));
      }
    })  
  }

  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    let formVal = nextProps.form.getFieldsValue();
    const {dispatch, ShopForm} = this.props;

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
      // let extraTemp = ()=> {
      //   return (
      //     <FormItem
      //     {...formItemLayout}
      //     label="店铺标签"
      //     hasFeedback
      //     >
      // {getFieldDecorator('shopTag', {
      //     rules: [{ required: true, message: '店铺标签不能为空' }],
      //     })(
      //     <Input  placeholder="店铺标签" />
      //     )}
      // </FormItem>
      // <FormItem
      // {...formItemLayout}
      // label="店铺营业时间"
      // hasFeedback
      // >
      // {getFieldDecorator('shopStarttime', {
      //     rules: [{ required: true, message: '营业时间不能为空' }],
      //     })(
      //         <TimePicker format="hh:mm"  />
      //     )}
      //     至  <TimePicker format="hh:mm"  />
      
      // </FormItem>
      
      // <FormItem
      // {...formItemLayout}
      // label="店铺封面"
      // hasFeedback
      // >
      // {getFieldDecorator('shopPicture', {
      //     rules: [{ required: true, message: '图片不能为空' }],
      //     })(
      //     <Upload>
      //         <Button>
      //         <Icon type="upload" /> 上传图片
      //         </Button>
      //     </Upload>
      //     )}
      
      // </FormItem>
      
      // <FormItem
      // {...formItemLayout}
      // label="上传合同"
      // hasFeedback
      // >
      // {getFieldDecorator('shopContract', {
      //     rules: [{ required: true, message: '合同不能为空' }],
      //     })(
      //     <Upload>
      //         <Button >
      //             <Icon type="upload" /> 点击上传文件
      //         </Button>
      //     </Upload>
      //     )}
      
      // </FormItem>
      
      // <FormItem
      // {...formItemLayout}
      // label="店铺地址"
      // hasFeedback
      // >
      // {getFieldDecorator('shopAddress', {
      //     rules: [{ required: true, message: '店铺地址不能为空' }],
      //     })(
      //     <AMapSearcher />
      //     )}
      // </FormItem>
      
      // <FormItem
      // {...formItemLayout}
      // label="店铺简介"
      // hasFeedback
      // >
      // {getFieldDecorator('shopDescrption', {
      // rules: [{ required: true, message: '店铺简介不能为空' }],
      // })(
      // <Input placeholder="店铺简介" />
      // )}
      // </FormItem>
      //   )
      // }

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
                <Input className="shop-name-input" disabled={this.props.modalEditable} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="店铺名称" />
            )}
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="店铺电话"
            >
            {getFieldDecorator('shopPhone', {
                rules: [{ required: true, message: '填入手机号' }],
            })(
                <Input addonBefore={prefixSelector} disabled={this.props.modalEditable}  style={{ width: '100%' }} />
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

function mapStateToProps(state) {
  console.log(state)
  return {
      ShopForm: state.ShopForm,
   };
}
export default connect(mapStateToProps)(CommonForm);
