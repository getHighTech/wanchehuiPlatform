//此组件用于测试
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Modal,Button } from 'antd';
import { Input } from 'antd';
import OrderStateForm from './OrderState_compontents/OrderStateForm.jsx';
import {addOrderStatus,editStatus} from '/imports/ui/actions/order_status.js'
import { Table } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

class OrderState extends Component {
  state = {
     visible: false,
     dataSource:[]
   }







  showModal = () => {
    let self =this;
    const {dispatch } = self.props;
    dispatch(addOrderStatus())
    self.setState({
      visible: true,
    });

  }
  handleOk = (e) => {


    let self = this;
    let validated = true;
    console.log(this.formComponent);
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
    console.log(self.props.modalState);
    if(self.props.modalState){

    }
    else {
      Meteor.call('OrderStatus.update',this.props.OrderStatus,newObj,function(err,alt){
        if(!err){
          self.getDataSource();
        }
      })
    }




    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  onEditOrderStatus(id){
    let self = this;
    console.log(id);
    Meteor.call('get.OrderState.byId',id,function(err,rlt){
      if(!err){
      console.log(rlt);
      const {dispatch} = self.props;
      dispatch(editStatus(rlt))
      self.setState({
        visible:true
      })
    }
    })
  }
  getDataSource(){
    let self = this;
    Meteor.call('get.all.OrderStatusAccesses',function(err,rlt){
      console.log(rlt);
      self.setState({
        dataSource:rlt
      })
    })
  }
  componentDidMount(){
    let self =this;
    self.getDataSource();

  }

 render() {
   const {OrderStatus,modalState,editState}=this.props
   console.log(this.props.OrderStatus);
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
          <Modal title="订单状态" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}  >
          <OrderStateForm OrderStatus={this.props.OrderStatus} ref = {(input) => { this.formComponent = input; }} />
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

  };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
  };
}, connect(mapStateToProps)(OrderState));
