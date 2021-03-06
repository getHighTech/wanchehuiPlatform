import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import { Divider } from 'antd';
import Checkbox from 'antd/lib/checkbox';
import { connect } from 'react-redux';
import {createForm} from 'rc-form'
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
import UploadToCloudinary from '../../public/UploadToCloudinary';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
const Option =Select.Option;
const SubMenu = Menu.SubMenu;
const CarouselUrl = []

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/images/upload');
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
        images: this.props.product.images,
        key_arr:[],
        key_length:0,
        agencykey_arr:[],
        parameterkey_arr:[],
        agencykey_length:0,
        parameterkey_length:0,
        initialProductClass:[],
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
  agencyremove = (k) => {
  const { form } = this.props;
  // can use data-binding to get
  const keyss = form.getFieldValue('keyss');
  // We need at least one passenger
  if (keyss.length === 1) {
    return;
  }

  // can use data-binding to set
  form.setFieldsValue({
    keyss: keyss.filter(key => key !== k),
  });
  }

  parameterremove = (k) => {
    const {form} =this.props;
    const parameterkeys = form.getFieldValue('parameterkeys');
    if (parameterkeys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      parameterkeys: parameterkeys.filter(key => key !== k),
    });
  }

  agencyadd = () => {
    const { form } = this.props;
    // can use data-binding to get

    const keyss = form.getFieldValue('keyss');
    this.setState({
      agencykey_arr:keyss
    })
    let agencyLength = keyss.length;
    this.setState({
      agencykey_length:agencyLength
    })
    const nextKeys = keyss.concat(agencyLength);
    agencyLength++;
    // console.log(uuid);
    //
    // this.update_uuid(uuid);
    // console.log(this.state.uuid);
    form.setFieldsValue({
      keyss: nextKeys,
    });
  }

  parameteradd =()=>{
    const { form } = this.props;
    // can use data-binding to get

    const parameterkeys = form.getFieldValue('parameterkeys');
    this.setState({
      parameterkey_arr:parameterkeys
    })
    let parameterLength = parameterkeys.length;
    this.setState({
      parameterkey_length:parameterLength
    })
    const nextKeys = parameterkeys.concat(parameterLength);
    parameterLength++;
    // console.log(uuid);
    //
    // this.update_uuid(uuid);
    // console.log(this.state.uuid);
    form.setFieldsValue({
      parameterkeys: nextKeys,
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
  setCoverUrl(url){
    let self = this
    console.log('上传图片成功')
    console.log(url)
    this.setState({
      image_url:url
    })
    const setFieldsValue = this.props.form.setFieldsValue;
    setFieldsValue({ cover: self.state.image_url })
  }
  setCarouselUrl(url) {
    let self = this
    console.log('上传轮播图成功')
    if (this.props.product.images){
      let CarouselUrl = this.props.product.images
    }else{
      let CarouselUrl = []
    }
    CarouselUrl.push(url)
    console.log(CarouselUrl)
    this.setState({
      images: CarouselUrl
    })
    const setFieldsValue = this.props.form.setFieldsValue;
    setFieldsValue({ images: self.state.images })
  }
  removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  deteleImage(url){
    console.log('删除轮播图单图')
    console.log(url)
    console.log(this.props.product.images)
    let CarouselUrl = this.props.product.images
    this.removeByValue(CarouselUrl,url)
    console.log(CarouselUrl)
    this.setState({
      images: CarouselUrl
    })
    const setFieldsValue = this.props.form.setFieldsValue;
    setFieldsValue({ images: self.state.images })

  }
  setDetailsImageUrl(url){
    let self = this
    console.log('上传商品详情成功')
    console.log(url)
    this.setState({
      image_details:url
    })
    const setFieldsValue = this.props.form.setFieldsValue;
    setFieldsValue({ detailsImage: self.state.image_details })
  }
  componentDidMount(){
    let self = this;
    if (this.props.product){
      console.log('编辑单店')
      console.log(self.props.product)
    }
    Meteor.call('get.all_product_classes',function(err,alt){
      if (!err) {
        self.setState({
          initialProductClass:alt
        })
      }
      else {
        console.log(err);
      }
    })
    self.setState({
      openKeys: self.props.descriptionKey,
      cover:self.props.product.cover,
    })
  }




      onEditorStateChange(editorState) {
        this.setState({
          contentState: editorState,
        });
        let htmlcontent=draftToHtml(convertToRaw(this.state.contentState.getCurrentContent()));
        const setFieldsValue = this.props.form.setFieldsValue;
        setFieldsValue({description:htmlcontent})
      }

    changeOpenState(){
      this.setState({
        openKeys:[]
      })
    }


    getInitialvalue(){
      let spec_length=this.props.product.specifications;
      if(spec_length!=undefined)
      {
        return
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

    getSpecNameGroup(k){
      const { form } = this.props;
      let spec=this.props.product.newSpecGroups;
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

    getSpecValueGroup(k){
      const { form } = this.props;
      let spec=this.props.product.newSpecGroups;
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


    proClassCheck=(rule,value,callback) => {
      let self =this;
      const { getFieldValue } = this.props.form;
      let result =getFieldValue('productClass');
      console.log(result);
      if (typeof(result)!='undefined') {
        console.log('1');
        callback()
      }
      else {
        console.log('2');
        callback('请选择商品种类！不能为空')
      }
    }





    getParameterName(k){
      const { form } = this.props;
      let parameter=this.props.product.parameterlist;
      if(typeof(parameter)!='undefined'){
        let length=parameter.length-1;

      if(k<=length){
      return  parameter[k].parameter_name;
        }
      else {
        return ''
      }
      }
      else {
      return ''
      }
      }
      getParameterValue(k){
        const { form } = this.props;
        let parameter=this.props.product.parameterlist;
        if(typeof(parameter)!='undefined'){
          let length=parameter.length-1;

        if(k<=length){
        return  parameter[k].parameter_value;
          }
        else {
          return ''
        }
        }
        else {
        return ''
        }
        }
    getAgency(k){
      const {form} =this.props;
      let agency=this.props.product.agencyLevelPrices;
      if(typeof(agency)!='undefined'){
        let length = agency.length -1 ;
        if(k<=length){
          return agency[k]/100;
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
    getSpecPrice(k){
      let aaa =this.props.key_arr.length;
      let spec=this.props.product.specifications;
      if(typeof(spec)!='undefined'){
        let length=spec.length-1;

      if(k<=length){
      return  spec[k].spec_price;
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

 



    render() {
      const { contentState,cover ,fileList,fileListMore,fileListDetails} = this.state;
      const  { singleProduct } = this.props;
      console.log(singleProduct)

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

           getFieldDecorator('cover')
           getFieldDecorator('parameterkeys',{initialValue:this.props.key_parameterarr});
            const parameterkeys = getFieldValue('parameterkeys');
            const parameterItems =parameterkeys.map((k, index) => {
              return(
                <FormItem
                {...formItemLayout}
                label='参数名'
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`parameter_name[${k}]`, {
                    initialValue:this.getParameterName(k),
                    validateTrigger: ['onChange', 'onBlur'],

                  })(
                    <Input placeholder="参数名" style={{ width: '100%'}} />
                  )}
                </FormItem>

              )
            })
            const parameterItems2 = parameterkeys.map((k, index) => {
              return(
                <FormItem
                {...formItemLayout}
                label='参数值'
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`parameter_value[${k}]`, {
                    initialValue:this.getParameterValue(k),
                    validateTrigger: ['onChange', 'onBlur'],

                  })(
                    <Input placeholder="参数值" style={{ width: '80%'}} />
                  )}
                  {parameterkeys.length > 1 ? (
                          <Icon
                            style={{marginLeft:10}}
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={parameterkeys.length === 1}
                            onClick={() => this.parameterremove(k)}
                          />
                        ) : null}
                </FormItem>

              )
            })





            getFieldDecorator('keyss',{initialValue:this.props.key_agencyarr})
            const keyss = getFieldValue('keyss');
            const formItemsAgency = keyss.map((k, index) => {
              return (
                <FormItem
                {...formItemLayout}
                label={k+1+'级分销'}
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`agencyPrice[${k}]`, {
                    initialValue:this.getAgency(k),
                    validateTrigger: ['onChange', 'onBlur'],
                    // rules: [{
                    //   required: true,
                    //   whitespace: true,
                    //   message: "请输入奖励.",
                    // }],
                  })(
                    <Input placeholder="奖励" style={{ width: '30%'}} />
                  )}
                  {keyss.length > 1 ? (
                    <Icon
                      style={{marginLeft:10}}
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={keyss.length === 1}
                      onClick={() => this.agencyremove(k)}
                    />
                  ) : null}
                </FormItem>
              );
            });

            const type=this.state.initialProductClass;
            const children=[];
            for (var i = 0; i < type.length; i++) {
              children.push(<Option key={type[i].name}>{type[i].name_zh}</Option>)
            }
            

            const productClassLength = [1];
            const productClass = productClassLength.map((k,index) => {
              if(this.props.modalState){
                return(
                  <FormItem
                  {...formItemLayout}
                  label='商品分类'
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`productClass`, {
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{ validator: this.proClassCheck }],

                    })(
                      <Select
                      placeholder="选择商品分类"
                      dropdownStyle={{zIndex:'99999' }}
                      style={{ width: '20%' }}>
                       {children}
                     </Select>
                    )}
                  </FormItem>

                )
              }
              else {
                return(
                  <FormItem
                  {...formItemLayout}
                  label='商品分类'
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`productClass`, {
                      // validateTrigger: ['onChange', 'onBlur'],
                      initialValue:this.props.product.productClass,
                      rules: [{ required: true, message: '商品名称不能为空' }],
                    })(
                      <Select
                      placeholder="选择商品分类"
                      dropdownStyle={{zIndex:'99999' }}
                      style={{ width: '20%' }}>
                       {children}
                     </Select>
                      // <Input placeholder="商品分类" disabled={!this.props.modalState} style={{ width: '20%'}} />
                    )}
                  </FormItem>
                )
              }
            })


            getFieldDecorator('keys', { initialValue:this.props.key_arr});
            const keys = getFieldValue('keys');
            const formItems = keys.map((k, index) => {
              if(this.props.modalState){
                return (
                  <FormItem
                  {...formItemLayout}
                  label='规格名'
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`spec_name[${k}]`, {
                      initialValue:this.getSpecName(k),
                      validateTrigger: ['onChange', 'onBlur'],

                    })(
                      <Input placeholder="产品规格" disabled={!this.props.modalState} style={{ width: '100%'}} />
                    )}
                  </FormItem>
                );
              }
              else {
                return (
                  <FormItem
                  {...formItemLayout}
                  label='规格名'
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`spec_name[${k}]`, {
                      initialValue:this.getSpecNameGroup(k),
                      validateTrigger: ['onChange', 'onBlur'],

                    })(
                      <Input placeholder="产品规格" disabled={this.props.modalState} style={{ width: '100%'}} />
                    )}
                  </FormItem>
                );
              }


            });

            const formItems2 = keys.map((k, index) => {
              if (this.props.modalState) {
                return (
                  <FormItem
                    {...formItemLayout}
                    label='规格值'
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`spec_value[${k}]`, {
                      validateTrigger: ['onChange', 'onBlur'],

                    })(
                      <Select
                      mode="tags"
                      style={{ width: '80%' }}
                      placeholder="Please select"
                      onChange={this.handleChangeSpec}
                      disabled={!this.props.modalState}
                      dropdownStyle={{zIndex:'99999' }}
                      ></Select>
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
              }
              else {
                return (
                  <FormItem
                    {...formItemLayout}
                    label='规格值'
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`spec_value[${k}]`, {
                      initialValue:this.getSpecValueGroup(k),
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入属性.",
                      }],
                    })(
                      <Input placeholder="属性" disabled={this.props.modalState} style={{ width: '70%'}} />
                    )}

                  </FormItem>
                );
              }

            });
      return (
        <Form onSubmit={this.handleSubmit}>

        {productClass}

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
        label="商品销量"
        hasFeedback
      >
        {getFieldDecorator('sales_volume', {
          initialValue: this.props.product.sales_volume,
          rules: [{ required: true, message: '商品销量不能为空' }],
        })(

          <Input className="shop-name-input" disabled={this.props.editState} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请填写数字" />
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="商品封面"
        hasFeedback
      >
        {getFieldDecorator('cover', {
          initialValue: this.props.product.cover,
        })(
          <Input type="text" style={{ display: 'none' }} placeholder="图片地址" />
        )}
            <UploadToCloudinary initUrl={this.props.product.cover} setUrl={this.setCoverUrl.bind(this)} single={true} />
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="轮播图"
        hasFeedback
      >
            {getFieldDecorator('images', {
              initialValue: this.props.product.images,
        })(
          <Input type="text" style={{ display: 'none' }} placeholder="轮播图地址" />
        )}
            <UploadToCloudinary initUrl={this.props.product.images} setUrl={this.setCarouselUrl.bind(this)} deteleImage={this.deteleImage.bind(this)} />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="商品详情图"
        hasFeedback
      >
            {getFieldDecorator('detailsImage', {
              initialValue: this.props.product.detailsImage,
        })(
          <Input type="text" style={{ display: 'none' }} placeholder="图片地址" />
        )}
            <UploadToCloudinary initUrl={this.props.product.detailsImage} setUrl={this.setDetailsImageUrl.bind(this)} single={true} />
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
      label="是否预约"
      >
      {getFieldDecorator('isAppointment', {
        valuePropName:'checked',
        initialValue: this.props.product.isAppointment,
          })(
            <Checkbox disabled={this.props.editState}>预约</Checkbox>
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
      <FormItem
      {...formItemLayout}
      label="商品参数"
      hasFeedback
      >
      <Button type="dashed" onClick={this.parameteradd}  >
        <Icon type="plus" />添加参数
      </Button>
      </FormItem>
      <Row>
        <Col span={4}></Col>
        <Col span={6}>{parameterItems}</Col>
        <Col span={6}>{parameterItems2}</Col>
        <Col span={4}></Col>
      </Row>
      <Divider dashed />
      <FormItem
      {...formItemLayout}
      label="商品分销奖励"
      hasFeedback
      >
      <Button type="dashed" onClick={this.agencyadd}  >
        <Icon type="plus" />添加等级
      </Button>
      </FormItem>

        {formItemsAgency}

      <Divider dashed />
      <FormItem {...formItemLayout}label='添加商品规格'>
        <Button type="dashed" onClick={this.add} disabled={!this.props.modalState} >
          <Icon type="plus" />添加规格
        </Button>

      </FormItem>

      <Row>
        <Col span={4}></Col>
        <Col span={6}>{formItems}</Col>
        <Col span={12}>{formItems2}</Col>
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
        {getFieldDecorator('parameterlist', { initialValue:this.getInitialvalue()})}
        {getFieldDecorator('images')}
        {getFieldDecorator('detailsImage')}

      </Form>
      )
    }
  }


const ProductForm = Form.create()(ProductFormWrap);

export default ProductForm;



// const ProductForm = createForm()(ProductFormWrap);

// function mapStateToProps(state) {
//   console.log(state)
//   return {
//     singleProduct: state.ProductsList.singleProduct,
//   };
// }
// export default connect(mapStateToProps)(ProductForm);


