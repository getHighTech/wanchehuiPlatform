import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import { Select } from 'antd';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
const Option = Select.Option;
import Tag from 'antd/lib/tag/';
import 'antd/lib/tag/style';
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

class ProductClass extends Component {
    state = {
       visible: false,
       productClass:[],
       initialProductClass:[]
     }
     showModal = () => {
       this.setState({
         visible: true,
         productClass:[]
       });
     }
     handleOk = (e) => {
       let self = this;
       let newProductClass= self.state.productClass;
       let initialProductClass = self.state.initialProductClass;
       for(var i = 0;i<newProductClass.length;i++){
         if (initialProductClass.indexOf(newProductClass[i])>=0) {
           message.error('已存在'+newProductClass[i]+'分类');
           return
         }
         else {
           let productclass =newProductClass[i]
           Meteor.call('productclass.insert',productclass,function(err,alt){
             if (!err) {
               self.getData();
             }
           })
         }
       }


       this.setState({
         visible: false,
         productClass:[]
       });
     }
     handleCancel = (e) => {
       this.setState({
         visible: false,
         productClass:[]
       });
     }
     handleChange(value) {
       this.setState({
         productClass:value
       })
     }
     componentDidMount(){
       let self = this;
       self.getData();
     }
     getData(){
       let self =this;
       Meteor.call('get.productclass',function(err,alt){
         if (!err) {
           self.setState({
             initialProductClass:alt
           })
         }
         else {
           console.log(err);
         }
       })
     }
  render() {
      const classData =this.state.initialProductClass;
     return (
      <div>
      <span>当前分类:
      {classData.map((color,index)=>
        <Tag key={index}  style={{marginLeft:10}} >{color}</Tag>
      )}
      </span>
      <br /><br />
      <Button type="dashed" onClick={this.showModal}  >
        <Icon type="plus" />添加分类
      </Button>
      <Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          dropdownStyle={{zIndex:'99999' }}
          placeholder="输入后按回车键生成分类"
          onChange={this.handleChange.bind(this)}
        >
        </Select>
        </Modal>
      </div>
     );
   }
 }
 function mapStateToProps(state) {return {};}
 export default connect(mapStateToProps)(ProductClass);
