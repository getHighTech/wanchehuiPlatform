import React from "react";

import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';

import 'antd/lib/form/style';
import 'antd/lib/checkbox/style'

import message from 'antd/lib/message';
import 'antd/lib/message/style';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import { Roles } from '/imports/api/roles/roles.js';
import ProductForm from './ProductForm.jsx';
import {Link} from 'react-router';



class ProductModal extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  state={
    xx:[],
    fileState:'',
    coverState:'',
    detailsState:'',
    spec : '',
    spec_length:0,
    descriptionKey:[],
    shopName:''
  }

  initAmap(){
    var map = new AMap.Map('container', {
            center: [117.00, 36.68],
            zoom: 6
        });
    map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
    });
  }

  test(str){
      console.log(str);
  }
  getSpec (end_spec){
    this.setState({
      spec: end_spec
    })
  }
   /**
   * 设置表单要显示的数据
   */
  setFormData(data) {
    console.log(data);
    // 注意这里, 由于antd modal的特殊性, this.formComponent可能是undefined, 要判断一下
    if (this.formComponent) {
      console.log(this.formComponent);
      this.formComponent.resetFields();
      if (data) {
        this.formComponent.setFieldsValue(data);
      }
    } else {
      this.formInitData = data;
    }
  }

  reflashTable(){
    this.props.getProducts();
  }
  componentWillMount(){
  }
  componentDidMount(){
    // console.log(this.props.singleProduct);
    let shopId=this.props.id;
    let self =this;
    Meteor.call('shops.findShopById',shopId,function(err,alt){
      console.log(alt);
      self.setState({
        shopName:alt.name
      })
    })
    console.log(self.state.shopName);

  }
  doExchange(arr){
    console.log(arr);
    if (typeof(arr)!='undefined') {


       var len = arr.length;
       console.log(arr);
       if(len >= 2){
           var len1 = arr[0].length;
           var len2 = arr[1].length;
           var lenBoth = len1 * len2;
           var items = new Array(lenBoth);
           var index = 0;
           for(var i=0; i<len1; i++){
               for(var j=0; j<len2; j++){
                 if(arr[0][i] instanceof Array){
                      items[index] = arr[0][i].concat(arr[1][j]);
                  }else{
                      items[index] = [arr[0][i]].concat(arr[1][j]);
                  }
                  index++;
               }
           }
           var newArr = new Array(len -1);
           for(var i=2;i<arr.length;i++){
               newArr[i-1] = arr[i];
           }
           newArr[0] = items;
           if(newArr.length<=len){
             return this.doExchange(newArr);

           }

       }else{
           return arr[0];
       }
     }
   }



  handleModalOk = () => {
    let self = this;
    let validated = true;
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated);
    if (!validated) {
      console.log('参数错误');
      return;
    }
    //处理收到的表单的数据
    const newObj = {};

    // const getFieldValue = this.props.form.getFieldValue;
    // console.log(getFieldValue('shopAddress'))
    const getFieldValue = this.formComponent.getFieldValue;
    const setFieldsValue = this.formComponent.setFieldsValue;
    const oldObj = this.formComponent.getFieldsValue();
    let speckeys = oldObj.keys;
    let specname=oldObj.spec_name;
    let specvalue=oldObj.spec_value;
    // let specprice=oldObj.spec_price;
    let end_spec=[];
    for(var i = 0; i<speckeys.length;i++){
      var spec_index=speckeys[i];
      var spec_name=specname[spec_index];
      var spec_value=specvalue[spec_index];
      // var spec_price=specprice[spec_index];
      var o1={spec_name:spec_name};
      var o2={spec_value:spec_value};
      // var o3={spec_price:spec_price}
      var o3={isThis:false};
      var obj = Object.assign(o1,o2,o3);
      end_spec.push(obj);
    }
    console.log(end_spec);
    setFieldsValue({specifications: end_spec})

    let parameterkeys =oldObj.parameterkeys;
    let parametername =oldObj.parameter_name;
    let parametervalue=oldObj.parameter_value;
    let end_parameter = [];
    for(var i=0;i<parameterkeys.length;i++){
      var parameter_index=parameterkeys[i];
      var parameter_name=parametername[parameter_index];
      var parameter_value=parametervalue[parameter_index];
      var o1={parameter_name:parameter_name};
      var o2={parameter_value:parameter_value};
      var obj=Object.assign(o1,o2);
      end_parameter.push(obj)
    }
    // console.log(end_parameter);
    oldObj.parameterlist=end_parameter;
    for (const key in oldObj) {
        newObj[key] = oldObj[key];
    }
    // let newPrice=newObj.price;
    // newObj.price=newPrice*100;
    // let newEndPrice =newObj.endPrice;
    // newObj.endPrice=newEndPrice*100;

    let specValue = newObj.spec_value;
    let specName = newObj.spec_name;
    self.doExchange(specValue)
    let specAllValue = self.doExchange(specValue);
    let aaass = [];
    let  newSpecGroup= [];
    if(typeof(specAllValue)!='undefined'){

      if(specName.length>1){
        for(var i = 0;i<specAllValue.length;i++){
          let aa = specAllValue[i];
          console.log(aa);
          console.log(aa.length);
          var obj =''
          var index = 0;
          var zzzz= [];
          var newSpecObjArray=[]
          var newSpecObj=''
          for (var j = 0; j < aa.length; j++) {
            var zsxzz =aa[j]
            var name = specName[j]
            var local ={[name]:zsxzz}
            var newIndexOne ={spec_name:name}
            var newIndexTwo ={spec_value:zsxzz}
              obj =Object.assign(local)
              newSpecObj = Object.assign(newIndexOne,newIndexTwo)
              index++
              newSpecObjArray.push(newSpecObj)
              zzzz.push(obj)


          }
          aaass.push(zzzz)
          newSpecGroup.push(newSpecObjArray);
        }
      }
      else {
        console.log(specAllValue);
        var obj =''
        var index = 0;
        var zzzz= [];
        var newSpecObjArray=[]
        var newSpecObj=''
        for(var i = 0;i<specAllValue.length;i++){
          var zsxzz=specAllValue[i];
          var name = specName[0];
          var local ={[name]:zsxzz}
          var newIndexOne ={spec_name:name}
          var newIndexTwo ={spec_value:zsxzz}
          obj =Object.assign(local)
          newSpecObj = Object.assign(newIndexOne,newIndexTwo)
          index++
          newSpecObjArray.push(newSpecObj)
          zzzz.push(obj)
        }
        aaass.push(zzzz)
        newSpecGroup.push(newSpecObjArray);
      }
      newObj.newSpecGroup= newSpecGroup;



    }
    newObj.specifications=aaass;
    console.log(newObj);
    let agencyPrice=newObj.agencyPrice;
    return;

    if (typeof(agencyPrice)!='undefined') {
      for(var i = 0; i<agencyPrice.length;i++){
        agencyPrice[i]=agencyPrice[i]*100
      }
    }
    else {
      newObj.agencyPrice= [];
    }
    if(newObj.isAppointment!=true){
      newObj.isAppointment=false
    }
    if(newObj.isTool!=true){
      newObj.isTool=false
    }
    if(newObj.recommend!=true){
      newObj.recommend=false
    }
    console.log(newObj);
    if (typeof(newObj.productClass)=='undefined') {
      message.error('商品分类不能为空！');
      return
    }
    if (typeof(newObj.name)=='undefined') {
      message.error('商品名不能为空！');
      return
    }
    if (typeof(newObj.name_zh)=='undefined') {
      message.error('商品名不能为空！');
      return
    }
    if (typeof(newObj.brief)=='undefined') {
      message.error('商品简介不能为空！');
      return
    }
    self.hideModal();
    if(self.props.modalState){
      //新增店铺到数据库
      let shopId=this.props.id;
      let shopName= this.state.shopName;
      let userId = Meteor.userId();
      if(aaass.length>0){
        if(specName.length>1){
          console.log('specName长度大于1');
          for (var i = 0; i < aaass.length; i++) {
            let newSpec = []
            let newspec =newObj.specifications[i];
            let newSpecGroups= [];
            let newSpecgroup =newObj.newSpecGroup[i];
            newSpec.push(newspec)
            newSpecGroups.push(newSpecgroup)
            Meteor.call("products.insert", newObj, shopId,shopName,newSpec[0],newSpecGroups[0],userId,function(error,result){
              if(!error){
                console.log("新增商品");
                console.log(result);
                //数据变化后，刷新表格
                self.reflashTable();
                self.setFormData({});
                console.log("刷新表格成功");
                self.setState({
                  xx:[],
                  fileState:'',
                  coverState:'',
                  detailsState:''
                })
                self.props.changeLoading(false)
                console.log(self.state.xx);
              }else{
                console.log(error);
              }
            })
          }
        }else {
          console.log('specName长度为于1');

          var newaaass=aaass[0];
          var newSpecGroupOne=newSpecGroup[0];
          console.log(newSpecGroup[0]);
          console.log(newaaass);
          for (var i = 0; i < newaaass.length; i++) {
            let newSpec = []
            let newspec =newaaass[i];
            let newSpecGroups= [];
            let newSpecgroup =newSpecGroupOne[i];
            newSpec.push(newspec);
            newSpecGroups.push(newSpecgroup)
            console.log(newSpecGroups);
            Meteor.call("products.insert", newObj, shopId,shopName,newSpec,newSpecGroups,userId,function(error,result){
              if(!error){
                console.log("新增商品");
                console.log(result);
                //数据变化后，刷新表格
                self.reflashTable();
                self.setFormData({});
                console.log("刷新表格成功");
                self.setState({
                  xx:[],
                  fileState:'',
                  coverState:'',
                  detailsState:''
                })
                self.props.changeLoading(false)
                console.log(self.state.xx);
              }else{
                console.log(error);
              }
            })
          }
        }





      }
      else {
        let newSpec= [];
        newObj.spec_name = [];
        console.log(newObj);
        Meteor.call("products.insert", newObj, shopId,shopName,newSpec,userId,function(error,result){
          if(!error){
            console.log("新增商品");
            console.log(result);
            //数据变化后，刷新表格
            self.reflashTable();
            self.setFormData({});
            console.log("刷新表格成功");
            self.setState({
              xx:[],
              fileState:'',
              coverState:'',
              detailsState:''
            })
            self.props.changeLoading(false)
            console.log(self.state.xx);
          }else{
            console.log(error);
          }
        })
      }






    }else{
      Meteor.call('product.update',this.props.singleProduct, newObj, function(error,result){
        if(!error){
          console.log('更新商品');
          self.reflashTable();
          self.setFormData({});
          self.setState({
            xx:[],
            fileState:'',
            coverState:'',
            detailsState:''
          })
          self.props.changeLoading(false)
          console.log(self.state.xx);
        }else{
          console.log(error);
        }
      })

    }

  }





  handleCancel = (e) => {
    console.log('走了这');
    this.props.onCancel();
    this.setFormData({});
    this.setState({
      descriptionKey:[],
      xx:[],
      fileState:'',
      coverState:'',
      detailsState:''
    })


  }

  hideModal = () => {
    this.props.onCancel();
  };
  changeXX(v){
    console.log(v);
    this.setState({
      xx:v
    })
  }
  changefileState(state){
    this.setState({
      fileState:state
    })
  }
  changecoverState(state){
    this.setState({
      coverState:state
    })
  }
  changedetailsState(state){
    this.setState({
      detailsState:state
    })
  }


  render(){
    const {singleProduct, modalState, editState,length,key_arr,productId} = this.props
    return(
      <div>
        <Modal
        maskClosable={false}
          title={this.props.productmodalTitle}
          visible={this.props.productmodalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleCancel.bind(this)}
          width={'80%'}
          style={{ top: 60 }}
        >
          <ProductForm id={this.props.id} xx={this.state.xx} changeXX={this.changeXX.bind(this)}  fileState={this.state.fileState} changefileState={this.changefileState.bind(this)} coverState={this.state.coverState} detailsState={this.state.detailsState} changedetailsState={this.changedetailsState.bind(this)} changecoverState={this.changecoverState.bind(this)} spec={this.state.spec} descriptionKey={this.state.descriptionKey}  getSpec={this.getSpec.bind(this)}  product= {this.props.singleProduct} modalState={this.props.modalState} key_arr={this.props.key_arr}  key_agencyarr={this.props.key_agencyarr} key_parameterarr={this.props.key_parameterarr} productId={this.props.productId} kay_length={this.props.length}  editState = {this.props.editState} ref = {(input) => { this.formComponent = input; }}  />

        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleProduct: state.ProductsList.singleProduct,
    modalState: state.ProductsList.productmodalInsert,
    editState: !state.ProductsList.productmodalEditable,
    length:state.ProductsList.key_length,
    key_arr:state.ProductsList.key_arr,
    key_agencyarr:state.ProductsList.key_agencyarr,
    key_parameterarr:state.ProductsList.key_parameterarr,
    productId:state.ProductsList.productId
   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(ProductModal));
