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
import { Editor } from 'react-draft-wysiwyg';
import { Row, Col } from 'antd';
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
import { EditorState, convertToRaw, ContentState } from 'draft-js';
function uploadImageCallBack(file) {

  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/images/upload/handler');
      xhr.send(file);

      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);

      });
    }
  );
}


let dudu=0;
class ProductFormWrap extends Component {


    constructor(props){
      super(props);
      console.log(this.props);
      console.log(this.props.key_length);

    }
    state = {
      fileList: [],
      image_url:'',
      value: false,
      status:false,
      images:[],
      key_arr:[],
      key_length:0
    };

    remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    console.log('add操作');
    const { form } = this.props;
    // can use data-binding to get
    console.log(this.props.product.specifications);

    const keys = form.getFieldValue('keys');
    console.log(keys);
    this.setState({
      key_arr:keys
    })
    console.log('keys的长度:'+keys.length);
    let uuid = keys.length;
    console.log('当前uuid:'+uuid);
    this.setState({
      key_length:uuid
    })
    const nextKeys = keys.concat(uuid);
    console.log(nextKeys);
    uuid++;
    // console.log(uuid);
    //
    // this.update_uuid(uuid);
    // console.log(this.state.uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  update_uuid(uuid){
    this.setState({
      uuid:uuid
    })
  }
  addover = (e) =>{
    let self =this;
    const { form } = this.props;
    e.preventDefault();
    const getFieldValue = this.props.form.getFieldValue;
    console.log(getFieldValue('keys'))
    let end_spec=[];
    for(var i =0;i<getFieldValue('keys').length;i++){
      var spec_index=getFieldValue('keys')[i]
      var spec_name =getFieldValue('spec_name')[spec_index];
      var spec_value= getFieldValue('spec_value')[spec_index];
      var o1={spec_name:spec_name};
      var o2={spec_value:spec_value};
      var o3={isThis:false}
      var obj =Object.assign(o1,o2,o3)
      end_spec.push(obj);
    }
    console.log(end_spec);
        // const setFieldsValue = this.props.form.setFieldsValue;
        // setFieldsValue({specifications:end_spec})
    self.props.cc(end_spec);
  }
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
    console.log(this.props.product);
    // const { form } = this.props;
    // console.log(this.props.spec_length);
    // this.setState({
    //   uuid: this.props.spec_length
    // })
    //
    // console.log(this.props.spec_length);
    // const keys = form.getFieldValue('keys');
    // console.log(keys);
    //
    // let uuid = this.props.spec_length
    // const nextKeys = keys.concat(uuid);
    // form.setFieldsValue({
    //   keys: nextKeys,
    // });
  }
  onEditorStateChange(editorState) {
    this.setState({
      contentState: editorState,
    });
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
          console.log(self.state.image_url);
          self.setState({
            image_url:info.file.response.data.link
          })
          const setFieldsValue = this.props.form.setFieldsValue;
          setFieldsValue({cover:self.state.image_url})

      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }

    }

    handleChangeMore(info) {
      console.log(info)
      let self = this
      if (info.file.status === 'uploading') {
          console.log("上传中。");
      }
      if (info.file.status === 'done') {
          console.log("上传成功。");
          console.log(info.file.response.data.link)
          console.log(self.state.images);
          let old_images = self.state.images;
          console.log(old_images);
          old_images.push(info.file.response.data.link);
          self.setState({
            images:old_images
          })
          const setFieldsValue = this.props.form.setFieldsValue;
          setFieldsValue({images:self.state.images})
          // const getFieldValue = this.props.form.getFieldValue;
          // console.log(getFieldValue('shopPicture'))
      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }

    }
    getInitialvalue(){
      let spec_length=this.props.product.specifications;
      if(spec_length!=undefined)
      {
        // var arr =new Array(4);
        // for(var i=0;i<arr.length;i++){
        //     arr[i] = i;
        // }
        // console.log(arr);
        // this.change(a);
      }

    }
    getCoverValue(){
      console.log(this.props.product.cover);
      let cover = this.props.product.cover;
      return cover
    }
    getSpecName(k){
      console.log('赋值操作');
      const { form } = this.props;
      let spec=this.props.product.specifications;
      if(typeof(spec)!='undefined'){
        let length=spec.length-1;

      if(k<=length){
      return  spec[k].spec_name;
        }
      else {
        return ''
      }
    }
    else {
      return ''
    }
    }
    getSpecValue(k){
      console.log(this.props.key_arr);
      let aaa =this.props.key_arr.length;
      let spec=this.props.product.specifications;
      if(typeof(spec)!='undefined'){
        let length=spec.length-1;

      if(k<=length){
      return  spec[k].spec_value;
        }
      else {
        return ''
      }
    }
    else {
      return ''
    }

    }

    change(a){
      this.setState({
        uuid:a
      })
    }


    selectHandleChange(value){
      console.log(`selected ${value}`);
    }
    //初次挂载去获取数据
    changeholeder(){
      console.log(this.props.product.holder);
    }

    render() {

      const { contentState } = this.state;
      const uploadProps = {
        action: '/images/upload',
        onChange: this.handleChange.bind(this),
        listType: 'picture',
      };
      const uploadPropsMore = {
        action: '/images/upload',
        onChange: this.handleChangeMore.bind(this),
        listType: 'picture',
      };

      const { getFieldDecorator, getFieldValue } = this.props.form;

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
            getFieldDecorator('keys', { initialValue:this.props.key_arr});
            const keys = getFieldValue('keys');
            const formItems = keys.map((k, index) => {
              return (
                <FormItem
                  {...(index === 0 ? formItemLayout : tailFormItemLayout)}
                  label={index === 0 ? '规格' : ''}
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`spec_name[${k}]`, {
                    initialValue:this.getSpecName(k),
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入产品规格.",
                    }],
                  })(
                    <Input placeholder="产品规格" style={{ width: '100%'}} />
                  )}

                </FormItem>
              );
            });
            const formItems2 = keys.map((k, index) => {
              return (
                <FormItem
                  {...(index === 0 ? formItemLayout : tailFormItemLayout)}
                  label={index === 0 ? '价格' : ''}
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`spec_value[${k}]`, {
                    initialValue:this.getSpecValue(k),
                    validateTrigger: ['onChange', 'onBlur'],

                  })(
                    <Input placeholder="价格" style={{ width: '70%'}} />
                  )}
                  {keys.length > 1 ? (
                    <Icon
                      style={{marginLeft:'10'}}
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={keys.length === 1}
                      onClick={() => this.remove(k)}
                    />
                  ) : null}
                </FormItem>
              );
            });
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
      label="商品封面"
      hasFeedback
      >
      {getFieldDecorator('cover', {
           initialValue: this.getCoverValue()
          })(
            <Input type="text"       placeholder="图片地址" />
          )}
          <Upload {...uploadProps}>
              <Button disabled={this.props.editState}>
              <Icon type="upload" /> 上传图片
              </Button>
          </Upload>
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
      <FormItem label='商品描述'>
        {getFieldDecorator('description',{
          initialValue: this.props.product.price,
        })(
        <Editor
        onEditorStateChange={this.onEditorStateChange.bind(this)}
         initialEditorState={contentState}
           editorState={contentState}
        localization={{
          locale: 'zh',
        }}
        toolbarClassName="rdw-storybook-toolbar"
         wrapperClassName="rdw-storybook-wrapper"
         editorClassName="rdw-storybook-editor"
        toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false },
            },
          }}
          />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="商品图片"
        hasFeedback
        >
        {getFieldDecorator('images', {
             initialValue: this.props.product.images,
            })(
              <Input type="text"   style={{display:'none'}}    placeholder="图片地址" />
            )}
            <Upload {...uploadPropsMore}>
                <Button disabled={this.props.editState}>
                <Icon type="upload" /> 上传多图片
                </Button>
            </Upload>
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
      {getFieldDecorator('recommend', {
        valuePropName:'checked',
        initialValue: this.props.product.recommend,
          })(
            <Checkbox disabled={this.props.editState}>上推荐</Checkbox>
          )}
      </FormItem>
      <Row>
        <Col span={2}></Col>
        <Col span={10}>{formItems}</Col>
        <Col span={10}>{formItems2}</Col>
        <Col span={2}></Col>
      </Row>
        <FormItem {...tailFormItemLayout}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
          <Button type="dashed" onClick={this.addover} style={{ width: '60%' }}>
             添加规格
          </Button>
        </FormItem>
        {getFieldDecorator('specifications', { initialValue:this.getInitialvalue()})};

      </Form>
      );
    }
  }

const ProductForm = Form.create()(ProductFormWrap);

export default ProductForm;
