//此组件用于测试
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Modal,Button } from 'antd';
import { Input } from 'antd';
import OrderStateForm from './OrderState_compontents/OrderStateForm.jsx';
import EditOrderStateForm from './OrderState_compontents/EditOrderStateForm.jsx';
import {addOrderStatus,editStatus,getOrderStatus} from '/imports/ui/actions/order_status.js'
import { Table } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

class OrderState extends Component {
  state = {
     addvisible: false,
     editvisible:false,
     dataSource:[]
   }

  showModal = () => {
    let self =this;
    Meteor.call('get.all.OrderStatusAccesses',function(err,alt){
      let status=  [];
      if (!err) {
        for (var i = 0; i < alt.length; i++) {
          status.push(alt[i].sFrom);
          status.push(alt[i].sTo);
        }
      }
      console.log(status);
      var newStatus = status.filter(function(element,index,self){
      return self.indexOf(element) === index;
      });
      console.log(newStatus);
      dispatch(getOrderStatus(newStatus));

    })
    const {dispatch } = self.props;
    dispatch(addOrderStatus());
    self.setState({
      addvisible: true,
    });

  }
  handleAddOk = (e) => {
    let self = this;
    let validated = true;
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated);
    if (!validated) {
      console.log('参数错误');
      return;
    }
    const newObj = {};
    const getFieldValue = this.formComponent.getFieldValue;
    const setFieldsValue = this.formComponent.setFieldsValue;
    const oldObj = this.formComponent.getFieldsValue();
    for (const key in oldObj) {
        newObj[key] = oldObj[key];
    }
    console.log(newObj);
    if( typeof(newObj.last)=='undefined'){
      newObj.last=[]
    }
    if( typeof(newObj.next)=='undefined'){
      newObj.next=[]
    }
    if(newObj.last.length>0){
      for (var i = 0; i < newObj.last.length; i++) {
        newObj.last[i]
        let newobj={current:newObj.last[i],next:newObj.current}
        Meteor.call('OrderStatus.insert',newobj,function(err,alt){
          if(!err){
            self.getDataSource();
            self.setFormData({});
          }
        })
      }
    }
    if(newObj.next.length>0){
      for (var i = 0; i < newObj.next.length; i++) {
        newObj.last[i]
        let newobj={current:newObj.current,next:newObj.next[i]}
        Meteor.call('OrderStatus.insert',newobj,function(err,alt){
          if(!err){
            self.getDataSource();
            self.setFormData({});
          }
        })
      }
    }








    this.setState({
      addvisible: false,
    });
  }
  handleEditOk = (e) => {
    let self = this;
    let validated = true;
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated);
    if (!validated) {
      console.log('参数错误');
      return;
    }
    const newObj = {};
    const getFieldValue = this.formComponent.getFieldValue;
    const setFieldsValue = this.formComponent.setFieldsValue;
    const oldObj = this.formComponent.getFieldsValue();
    for (const key in oldObj) {
        newObj[key] = oldObj[key];
    }

      Meteor.call('OrderStatus.update',this.props.OrderStatus,newObj,function(err,alt){
        if(!err){
          self.getDataSource();
          self.setFormData({});
        }
      })
    this.setState({
      editvisible: false,
    });
  }
  handleAddCancel = (e) => {
    let self =this;
    self.setState({
      addvisible: false,
    });
    self.setFormData({});
  }
  handleEditCancel = (e) => {
    let self =this;
    this.setState({
      editvisible: false,
    });
    self.setFormData({});
  }
  onEditOrderStatus(id){
    let self = this;
    Meteor.call('get.OrderState.byId',id,function(err,rlt){
      if(!err){
      const {dispatch} = self.props;
      dispatch(editStatus(rlt))
      self.setState({
        editvisible:true
      })
    }
    })
  }
  getDataSource(){
    let self = this;
    Meteor.call('get.all.OrderStatusAccesses',function(err,rlt){
      self.setState({
        dataSource:rlt
      })
    })
  }
  setFormData(data) {
    if (this.formComponent) {
      this.formComponent.resetFields();
      if (data) {
        this.formComponent.setFieldsValue(data);
      }
    } else {
      this.formInitData = data;
    }
  }
  componentDidMount(){
    let self =this;
    self.getDataSource();

  }

 render() {
   const {OrderStatus,modalState,editState}=this.props

   const columns = [
     {title:'当前状态',width:200,dataIndex:'sFrom',key:'sFrom'},
     {title:'改变状态',width:200,dataIndex:'sTo',key:'sTo'},
     {
       title: '状态操作',
       key: 'action',
       width: 200,
       render: (text,record) => {
         return(
           <span>

           <span className="ant-divider" />
           <Tooltip placement="topLeft" title="修改" arrowPointAtCenter>
             <Button shape="circle" icon="edit"  onClick={ () => this.onEditOrderStatus(record._id)}></Button>
           </Tooltip>


         </span>

         )
       }
     },
   ]
   return (
     <div>
          <Button type="dashed" icon="plus" onClick={this.showModal}>添加状态</Button>
          <Modal title="添加状态" visible={this.state.addvisible} onOk={this.handleAddOk} onCancel={this.handleAddCancel}  >
          <OrderStateForm OrderStatus={this.props.OrderStatus} modalState={this.props.modalState} getStatus={this.props.getStatus} ref = {(input) => { this.formComponent = input; }} />
          </Modal>
          <Modal title="编辑状态" visible={this.state.editvisible} onOk={this.handleEditOk} onCancel={this.handleEditCancel}  >
          <EditOrderStateForm OrderStatus={this.props.OrderStatus} modalState={this.props.modalState} getStatus={this.props.getStatus} ref = {(input) => { this.formComponent = input; }} />
          </Modal>
          <Table columns={columns}  dataSource={this.state.dataSource} />
     </div>
   );
 }



}
function mapStateToProps(state) {
  return {
    allState: state.OrderStatus,
    OrderStatus: state.OrderStatus.OrderStatus,
    modalState: state.OrderStatus.statusmodalInsert,
    editState: !state.OrderStatus.statusmodalEditable,
    getStatus:state.OrderStatus.getStatus

  };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
  };
}, connect(mapStateToProps)(OrderState));
