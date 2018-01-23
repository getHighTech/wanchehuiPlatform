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
      image_url:''
    };
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    handleChange(info) {
      console.log(info)
      let self = this
      if (info.file.status === 'uploading') {
          console.log("上传中。");
      }
      if (info.file.status === 'done') {
          console.log("上传成功。");
          console.log(info.file.response.data.link)
          self.setState({
            image_url:info.file.response.data.link
          })
          const setFieldsValue = this.props.form.setFieldsValue;
          setFieldsValue({cover:self.state.image_url})
          // const getFieldValue = this.props.form.getFieldValue;
          // console.log(getFieldValue('shopPicture'))
      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }

    }
    selectHandleChange(value){
      console.log(`selected ${value}`);
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

    // getDecoratorValue = (v) => {
    //   console.log("地图组件绑定的方法")
    //   let self = this
    //   const setFieldsValue = this.props.form.setFieldsValue;
    //   setFieldsValue({address: self.props.shop.shopAddress})
    //   const getFieldValue = this.props.form.getFieldValue;
    //   setFieldsValue({lntAndLat: self.props.shop.shopPoint})
    // }

    render() {

      const uploadProps = {
        action: '/images/upload',
        onChange: this.handleChange.bind(this),
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
        {getFieldDecorator('name', {
            initialValue: this.props.shop.name,
            rules: [{ required: true, message: '店铺名称不能为空' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="店铺名称" />
        )}
        </FormItem>

        <FormItem
        {...formItemLayout}
        label="店铺电话"
        >
        {getFieldDecorator('phone', {
          initialValue: this.props.shop.phone,
            rules: [{ required: true, message: '填入手机号' }],
        })(
            <Input  disabled={this.props.editState} style={{ width: '100%' }} />
        )}
        </FormItem>

      <FormItem
      {...formItemLayout}
      label="店铺封面"
      hasFeedback
      >
      {getFieldDecorator('cover', {
           initialValue: this.props.shop.cover,
          })(
            <Input type="text"   style={{display:'none'}}   placeholder="图片地址" />
          )}
          <Upload {...uploadProps}>
              <Button>
              <Icon type="upload" /> 上传图片
              </Button>
          </Upload>
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="店铺标签"
          hasFeedback
          >
      {getFieldDecorator('tags', {
        initialValue: this.props.shop.tags,
          rules: [{ required: true, message: '店铺标签不能为空' }],
          })(
            <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="输入完标签后按回车确认"
            onChange={this.selectHandleChange.bind(this)}
          >
          </Select>
          )}
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="店铺简介"
          hasFeedback
        >
          {getFieldDecorator('description', {
            initialValue: this.props.shop.description,
          rules: [{ required: true, message: '店铺简介不能为空' }],
          })(
          <Input disabled={this.props.editState} placeholder="店铺简介" />
          )}
        </FormItem>
      <FormItem
        {...formItemLayout}
        label='店铺地址'
        >
          {getFieldDecorator('address', {
            initialValue: this.props.shop.address,
          })(
            <Input type="text"  autoComplete="off"  style={{display:'none'}}   placeholder="图片地址" />
          )}
          <AMapComplete
            editState={this.props.editState}
            // onChange = {this.getDecoratorValue.bind(this)}
            // inputValue = {this.props.shop.address}
            />
        </FormItem>
        <FormItem style={{display:'none'}}
          {...formItemLayout}
          label="店铺经纬度"
          hasFeedback
        >
          {getFieldDecorator('lntAndLat', {
            initialValue: this.props.shop.lntAndLat,
          })(
          <Input style={{display:'none'}}   placeholder="店铺简介" />
          )}
        </FormItem>
      </Form>
      );
    }
  }

const ShopForm = Form.create()(ShopFormWrap);

export default ShopForm;
