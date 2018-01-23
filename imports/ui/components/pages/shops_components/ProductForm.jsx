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
import { Switch} from 'antd';
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
import { Radio } from 'antd';
const FormItem = Form.Item;
const format = 'HH:mm';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class ProductFormWrap extends Component {


    constructor(props){
      super(props);

    }
    state = {
      fileList: [],
      image_url:'',
      value: false,
      status:false
    };
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    changeisTool = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });

  }
  componentDidMount(){
    console.log(this.props.product.holder);
  }
  getInitialvalue=()=>{
    return this.props.product.holder
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
    changeholeder(){
      console.log(this.props.product._id);
      console.log(this.props.product.holder);
    }

    render() {
      console.log(this.props.product.holder);
      console.log(this.props.product.isTool);
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
        label="商品名称"
        hasFeedback
        >
        {getFieldDecorator('name', {
            initialValue: this.props.product.name,
            rules: [{ required: true, message: '商品名称不能为空' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品名称" />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品中文名称"
        hasFeedback
        >
        {getFieldDecorator('name_zh', {
            initialValue: this.props.product.name_zh,
            rules: [{ required: true, message: '商品名称不能为空' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品中文名称" />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品价格"
        hasFeedback
        >
        {getFieldDecorator('price', {
            initialValue: this.props.product.price,
            rules: [{ required: true, message: '商品价格不能为空' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品价格" />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品描述"
        hasFeedback
        >
        {getFieldDecorator('description', {
            initialValue: this.props.product.description,
            rules: [{ required: true, message: '商品描述' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品描述" />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品简介"
        hasFeedback
        >
        {getFieldDecorator('brief', {
            initialValue: this.props.product.brief,
            rules: [{ required: true, message: '商品简介' }],
        })(

            <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品简介" />
        )}
        </FormItem>

        <FormItem
        {...formItemLayout}
        label="商品类型"
        >
        {getFieldDecorator('isTool', {
          valuePropName:'checked',
          initialValue: this.props.product.isTool,
            })(
              <Checkbox disabled={this.props.editState}>工具类型</Checkbox>
            )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品推荐"
        >
        {getFieldDecorator('holder', {
          valuePropName:'checked',
          initialValue: this.props.product.holder,
            })(
              <Checkbox disabled={this.props.editState}>上推荐</Checkbox>
            )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品状态"
        >
        {getFieldDecorator('status', { valuePropName: 'checked',initialValue: this.props.product.status, })(
            <Switch  disabled={this.props.editState} checkedChildren="上架" unCheckedChildren="下架"/>
          )}
        </FormItem>
      </Form>
      );
    }
  }

const ProductForm = Form.create()(ProductFormWrap);

export default ProductForm;
