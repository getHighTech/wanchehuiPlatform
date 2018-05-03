import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Modal from 'antd/lib/modal';
import { Divider } from 'antd';
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
import {Menu} from 'antd'
const FormItem = Form.Item;
const format = 'HH:mm';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const SubMenu = Menu.SubMenu;
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

      // const contentBlock = htmlToDraft(html);
      // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      // const editorState = EditorState.createWithContent(contentState);
      // this.state = {
      //     contentState: editorState,
      //
      //   };
    }
    rootSubmenuKeys = [];
    state = {
        cover: '',
        fileList: [],
        fileListDetails:[],
        fileListMore:this.props.xx,
        image_url:this.props.product.cover,
        image_details:this.props.product.detailsImage,
        value: false,
        status:false,
        images:[],
        key_arr:[],
        key_length:0,
        openKeys:this.props.descriptionKey,
        fileState:this.props.changefileState
      };

      onOpenChange = (openKeys) => {
        let self =this;
          let description= this.props.product.description
          if(typeof(description)=='undefined'){
            let description='<p>开始编辑</p>'
            const setFieldsValue = this.props.form.setFieldsValue;
            setFieldsValue({description:description})
            const html =description;
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            // self.state={
            //   contentState: editorState,
            // }
            self.changel(editorState);
          }
          else {
            const html =description;
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            // self.state={
            //   contentState: editorState,
            // }
            self.changel(editorState);
          }



      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    }
      changel(editorState){
        let self =this;

        self.setState({
          contentState:editorState
        })
      }
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
    const { form } = this.props;
    // can use data-binding to get

    const keys = form.getFieldValue('keys');
    this.setState({
      key_arr:keys
    })
    let uuid = keys.length;
    this.setState({
      key_length:uuid
    })
    const nextKeys = keys.concat(uuid);
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
    //
    // componentWillReceiveProps(nextProps){
    //     this.setState(nextProps);
    //
    // }

    changeisTool = (e) => {
    this.setState({
      value: e.target.value,
    });

  }
  componentDidMount(){
    let images=this.props.product.images;
    let fileListImages=[];
    if(images!=null){
      for(var i=0;i<images.length;i++){
        var url=images[i];
        var first={uid:i};
        var end={url:url}
        var obj =Object.assign(first,end);
        fileListImages.push(obj)
      }
      this.setState({
        images:this.props.product.images,
        fileListMore:fileListImages
      })
    }
    else{
      // console.log('did 插入商品');
      this.setState({
        fileListMore:[],
        images:[],
      })
    }
    if(this.props.product.cover!=null){
      this.setState({
        fileList:[{uid:1,url:this.props.product.cover}],

      })
    }
    else{
      this.setState({
        fileList:[{uid:1,url:''}],

      })
    }
    if(this.props.product.detailsImage!=null){
      this.setState({
        fileListDetails:[{uid:1,url:this.props.product.detailsImage}]
      })
    }
    else{
      this.setState({
        fileListDetails:[{uid:1,url:''}]
      })
    }
    let self =this;

    self.setState({
      openKeys: self.props.descriptionKey,
      cover:self.props.product.cover,
    })
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.modalState){
      // console.log(nextProps);
      // console.log('will',nextProps.product.images);
      // console.log(this.state.images);
      // console.log(nextProps.fileState);

      if(nextProps.product.images==null){
        nextProps.product.images=[];
        // console.log(nextProps.product.images);
      }

      let images=nextProps.product.images;
      let fileListImages=[];
      if(images!=null){
        for(var i=0;i<images.length;i++){
          var url=images[i];
          var first={uid:i};
          var end={url:url}
          var obj =Object.assign(first,end);
          fileListImages.push(obj)
        }
      }
      if(nextProps.fileState!='removed'&&nextProps.fileState!='done'){
        // console.log('add');
        this.setState({
          fileListMore:fileListImages,
          images:nextProps.product.images,
        })
      }
      else{
        // console.log('removed');
      }
      console.log(nextProps.coverState);
      if(nextProps.coverState!='removed'&&nextProps.coverState!='done'){
      if(nextProps.product.cover!=null){
        console.log(nextProps.coverState);
        this.setState({
          fileList:[{uid:1,url:nextProps.product.cover}],
        })
      }
      else{
        this.setState({
          fileList:[{uid:1,url:''}],
        })
      }
    }
          // this.setState({
          //   cover: nextProps.product.cover,
          // })
        if(nextProps.detailsState!='removed'&&nextProps.detailsState!='done'){
        if(nextProps.product.detailsImage!=null){
          this.setState({
            fileListDetails:[{uid:2,url:nextProps.product.detailsImage}],
          })
        }
        else{
          console.log('nsadasdasd');
          this.setState({
            fileListDetails:[{uid:2,url:''}]
          })
        }
      }
        // this.setState({
        //   detailsImage:nextProps.product.detailsImage
        // })
        }
        else {
          console.log(nextProps);
          if(nextProps.coverState!='done'){
            this.setState({
              fileList:[{uid:1,url:''}],
            })
          }
          console.log(nextProps.detailsState);
          if(nextProps.detailsState!='done'){
            this.setState({
              fileListDetails:[{uid:1,url:''}],
            })
          }

          let file =nextProps.xx;
          let newfile=[];
          for(var i=0;i<file.length;i++){
            if (file[i].url==undefined) {
              newfile.push(file[i].response.data.link)
            }
            else{
              newfile.push(file[i].url)
            }
          }
          // console.log(newfile);
          if(nextProps.fileState!='removed'&&nextProps.fileState!='done'){
            // console.log('add');
            this.setState({
              fileListMore:nextProps.xx,
              images:newfile
            })
          }
          else{
            // console.log('removed');
          }
        }
    }



  onEditorStateChange(editorState) {
    this.setState({
      contentState: editorState,
    });
    let htmlcontent=draftToHtml(convertToRaw(this.state.contentState.getCurrentContent()));
    const setFieldsValue = this.props.form.setFieldsValue;
    setFieldsValue({description:htmlcontent})
  }


    handleChange(info) {
      let fileList = info.fileList;
      fileList = fileList.slice(-1);
      let self = this
      if (info.file.status === 'uploading') {
          console.log("上传中。");
      }
      if (info.file.status === 'done') {
          console.log("上传成功。");
          // console.log(info.file.response.data.link)
          // console.log(self.state.image_url);
          self.setState({
            image_url:info.file.response.data.link
          })
          self.props.changecoverState(info.file.status)
          const setFieldsValue = this.props.form.setFieldsValue;
          setFieldsValue({cover:self.state.image_url})

      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }
      self.setState({
        fileList:fileList
      })
    }
    handleChangeDetails(info) {
      let fileList = info.fileList;
      fileList = fileList.slice(-1);
      let self = this
      if (info.file.status === 'uploading') {
          console.log("上传中。");
      }
      if (info.file.status === 'done') {
          console.log("上传成功。");
          // console.log(info.file.response.data.link)
          // console.log(self.state.image_url);
          self.setState({
            image_details:info.file.response.data.link
          })
          self.props.changedetailsState(info.file.status)
          const setFieldsValue = this.props.form.setFieldsValue;

          setFieldsValue({detailsImage:self.state.image_details})

      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }
      self.setState({
        fileListDetails:fileList
      })
    }
    changeOpenState(){
      this.setState({
        openKeys:[]
      })
    }
    handleChangeMore(info) {
      let fileList = info.fileList;
      let self = this
      if (info.file.status === 'uploading') {
          console.log("上传中。");
      }
      if (info.file.status === 'done') {
          console.log("上传成功。");
          // console.log(info.file.response.data.link)
          // console.log(self.state.images);
          // console.log(self.state.fileListMore);
          let old_images = self.state.images;
          console.log(old_images);
          // if(old_images==null){
          //   console.log('null');
          //   old_images=[];
          // }
          old_images.push(info.file.response.data.link);
          self.setState({
            images:old_images,
          })
          // console.log(this.state.images);
          // console.log(this.state.fileListMore);
          let v =this.state.fileListMore;
          let state=info.file.status;
          self.props.changeXX(v)
          self.props.changefileState(state)
          const setFieldsValue = this.props.form.setFieldsValue;
          setFieldsValue({images:self.state.images})
      } else if (info.file.status === 'error') {
          console.log("上传失败。");
      }
      self.setState({
        fileListMore:fileList
      })
      if(info.file.status === 'removed'){
        // console.log(this.state.fileListMore);
        // console.log(this.state.images);
        let file=this.state.fileListMore;
        let newfile=[];
        for(var i=0;i<file.length;i++){
          if (file[i].url==undefined) {
            newfile.push(file[i].response.data.link)
          }
          else{
            newfile.push(file[i].url)
          }
        }
        // console.log(newfile);
        this.setState({
          images:newfile,
        })
        let state=info.file.status;
        this.props.changefileState(state)
        const setFieldsValue = this.props.form.setFieldsValue;
        setFieldsValue({images:newfile})
      }

    }

    getInitialvalue(){
      let spec_length=this.props.product.specifications;
      if(spec_length!=undefined)
      {
      }

    }
    handleConfirmName = (rule,value,callback ) => {
      let id= this.props.id;
      let condition={};
      if(!this.props.modalState){
        condition = {shopId:this.props.product.shopId,_id:{$ne:this.props.product._id}}
      }
      else{
        condition={shopId:id}
      }
      console.log(condition);
        const { getFieldValue } = this.props.form;
        let newName=getFieldValue('name');
        let newalt=[];
        Meteor.call('get.product.byShopIdOr',condition,function(err,alt){
          if(!err){
            for(var i =0;i<alt.length;i++){
              newalt.push(alt[i].name)
            }

          }
          else{
            console.log(err);
          }
          if(newalt.indexOf(newName)>-1){
            callback('已有相同商品名！请重新输入')
          }

        })



    }
    getdesValue(){


    }
    getProductPrice(){
      let price=this.props.product.price
      if(typeof(price)!='undefined'){
        return price/100
      }
      else {
        return ''
      }
    }
    getProductEndprice(){
      let price=this.props.product.endPrice
      if(typeof(price)!='undefined'){
        return price/100
      }
      else {
        return ''
      }
    }
    getCoverValue(){
      let cover = this.props.product.cover;
      return cover
    }
    getSpecName(k){
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
    getDescription(){
      const setFieldsValue = this.props.form.setFieldsValue;
      let description=this.props.product.description;
      if(typeof(description)!='undefined'){
        return description
      }
      else{
        return '<p>开始编辑<p>'
      }
    }

    selectHandleChange(value){
      // console.log(`selected ${value}`);
    }
    //初次挂载去获取数据
    changeholeder(){
      // console.log(this.props.product.holder);
    }

    render() {
      const { contentState,cover ,fileList,fileListMore,fileListDetails} = this.state;
      const  { product } = this.props;
        let uploadProps = {
          action: '/images/upload',
          onChange: this.handleChange.bind(this),
          listType: 'picture',
          fileList:fileList
        };

      const uploadPropsMore = {
        action: '/images/upload',
        onChange: this.handleChangeMore.bind(this),
        listType: 'picture',
        fileList:fileListMore
      };
      const uploadPropsDetails={
        action: '/images/upload',
        onChange:this.handleChangeDetails.bind(this),
        listType:'picture',
        fileList:fileListDetails
      }

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
                {...formItemLayout}
                label='规格属性'
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
                  {...formItemLayout}
                  label='价格'
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`spec_value[${k}]`, {
                    initialValue:this.getSpecValue(k),
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入价格.",
                    }],
                  })(
                    <Input placeholder="价格" style={{ width: '70%'}} />
                  )}
                  {keys.length > 1 ? (
                    <Icon
                      style={{marginLeft:10}}
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
          rules: [{ required: true, message: '商品名称不能为空'},{validator: this.handleConfirmName}]
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
          initialValue: this.getProductPrice(),
          rules: [{ required: true, message: '商品价格不能为空' }],
      })(

          <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品价格" />
      )}
      </FormItem>
      <FormItem
      {...formItemLayout}
      label="商品最终价格"
      hasFeedback
      >
      {getFieldDecorator('endPrice', {
          initialValue: this.getProductEndprice(),
          rules: [{ required: true, message: '商品价格不能为空' }],
      })(

          <Input className="shop-name-input"  disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品价格" />
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

        label="商品详情图片"
        hasFeedback
        >
        {getFieldDecorator('detailsImage',{
          initialValue:this.props.product.detailsImage,
        })(
          <Input type="text"   style={{display:'none'}}    placeholder="图片地址" />
        )}

        <Upload {...uploadPropsDetails}>
            <Button disabled={this.props.editState}>
            <Icon type="upload" /> 上传详情图片
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
      <Divider dashed />
      <FormItem {...formItemLayout}label='添加商品规格'>
        <Button type="dashed" onClick={this.add} >
          <Icon type="plus" />添加
        </Button>

      </FormItem>
      <Row>
        <Col span={4}></Col>
        <Col span={8}>{formItems}</Col>
        <Col span={11}>{formItems2}</Col>
        <Col span={4}></Col>
      </Row>

        <Divider dashed style={{marginTop:5 ,marginBottom:5}}/>
        <FormItem label='商品描述'>
          {getFieldDecorator('description',{initialValue:this.getDescription()})(

            <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: '100%' }}
        onBlur={() => {console.log('blur')}}
      >
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>点击开始编辑</span></span>}>

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
            onBlur={this.changeOpenState.bind(this)}
            />

            </SubMenu>
            </Menu>
          )}
          </FormItem>
        {getFieldDecorator('specifications', { initialValue:this.getInitialvalue()})}

      </Form>
      )
    }
  }

  const ProductForm = Form.create()(ProductFormWrap);

  export default ProductForm;
