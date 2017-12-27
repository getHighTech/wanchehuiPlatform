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
import AMapComplete from '../tools/AMapComplete.jsx';
import { Roles } from '/imports/api/roles/roles.js';
import moment from 'moment';

const FormItem = Form.Item;
const format = 'HH:mm';


class ShopFormWrap extends Component {


    constructor(props){
      super(props);

    }
    state = {
      fileList: [],
      shopAddress:''
    };
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }
    setShopAdderss(value){
      this.setState({shopAddress:value})
    }
    handleChange(info) {
      console.log(info)



      if (info.file.status === 'uploading') {
          console.log("上传中。");
      }
      if (info.file.status === 'done') {
          console.log("上传成功。");
      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }

      console.log(info.event)
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

    getDecoratorValue = (v) => {
      const setFieldsValue = this.props.form.setFieldsValue;
      // const getFieldValue = this.props.form.getFieldValue;
      // console.log(getFieldValue('shopAddress'))
      // const fieldName = v.name
      // const fieldValue = v.value
      console.log(v.target.value)
      setFieldsValue({shopAddress: v.target.value})
    }

    render() {

      const uploadProps = {
        action: '/images/upload',
        onChange: this.handleChange,
        listType: 'picture',
      };
      
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
            initialValue: this.props.shop.shopName,
            rules: [{ required: true, message: '店铺名称不能为空' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="店铺名称" />
        )}
        </FormItem>

        <FormItem
        {...formItemLayout}
        label="店铺电话"
        >
        {getFieldDecorator('shopPhone', {
          initialValue: this.props.shop.shopPhone,
            rules: [{ required: true, message: '填入手机号' }],
        })(
            <Input  disabled={this.props.editState} style={{ width: '100%' }} />
        )}
        </FormItem>

        {/* <FormItem
      {...formItemLayout}
              label="上传合同"
              hasFeedback
          >
            {getFieldDecorator('shopContract', {
                rules: [{ required: true, message: '合同不能为空' }],
                })(
                <Upload>
                    <Button >
                        <Icon type="upload" /> 点击上传文件
                    </Button>
                </Upload>
                )}
        </FormItem> */}
        <FormItem
      {...formItemLayout}
      label="店铺封面"
      hasFeedback
      >
      {getFieldDecorator('shopPicture', {
          rules: [{ required: true, message: '图片不能为空' }],
          })(
          <Upload {...uploadProps}>
              <Button>
              <Icon type="upload" /> 上传图片
              </Button>
          </Upload>
          )}

      </FormItem>
      <FormItem
          {...formItemLayout}
          label="店铺标签"
          hasFeedback
          >
      {getFieldDecorator('shopTag', {
        initialValue: this.props.shop.shopTag,
          rules: [{ required: true, message: '店铺标签不能为空' }],
          })(
          <Input  disabled={this.props.editState} placeholder="店铺标签" />
          )}
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="店铺简介"
          hasFeedback
        >
          {getFieldDecorator('shopDescrption', {
            initialValue: this.props.shop.shopDescrption,
          rules: [{ required: true, message: '店铺简介不能为空' }],
          })(
          <Input disabled={this.props.editState} placeholder="店铺简介" />
          )}
        </FormItem>
      <FormItem
        {...formItemLayout}
        label='店铺地址'
        >
          {getFieldDecorator('shopAddress', {
            getValueFromEvent: this.getDecoratorValue
          })(
            <AMapComplete
            editState={this.props.editState}
            fieldsName="shopAddress"
            />
          )}

        </FormItem>
      </Form>
      );
    }
  }

const ShopForm = Form.create()(ShopFormWrap);

export default ShopForm;
