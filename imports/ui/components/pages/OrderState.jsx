//此组件用于测试
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Modal,Button } from 'antd';
import { Input } from 'antd';
import { Switch} from 'antd';
import OrderStateForm from './OrderState_compontents/OrderStateForm.jsx';
import EditOrderStateForm from './OrderState_compontents/EditOrderStateForm.jsx';
import {addOrderStatus,editStatus,getOrderStatus} from '/imports/ui/actions/order_status.js'
import { Table } from 'antd';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

class OrderState extends Component {
  state = {
     addvisible: false,
     editvisible:false,
     dataSource:[],
     ButtonState:true,

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
      var newStatus = status.filter(function(element,index,self){
      return self.indexOf(element) === index;
      });
      dispatch(getOrderStatus(newStatus));

    })
    const {dispatch } = self.props;
    dispatch(addOrderStatus());
    self.setState({
      ButtonState:true,
      addvisible: true,
    });

  }
  handleAddOk = (e) => {
    // (async()=>{
    //     let data = awiat
    // })()
    let self = this;
    let validated = true;
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated);
    console.log(validated);
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
    if (typeof(newObj.productClass)=='undefined') {
      message.error('商品分类不能为空！');
      return
    }
    // return;

    if(newObj.last.length>0){
      for (var i = 0; i < newObj.last.length; i++) {
        let newobj={current:newObj.last[i],next:newObj.current,productClass:newObj.productClass};
        // Meteor.call('find.SameStatus',newobj,function(error,result){
        //   if (!error) {
        //     if(result=!0){
        //       message.error('已存在'+newobj.current+'到'+newobj.next+'的关系');
        //     }
        //   }
        // })
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
        let newobj={current:newObj.current,next:newObj.next[i],productClass:newObj.productClass}
        Meteor.call('OrderStatus.insert',newobj,function(err,alt){
          if(!err){
            self.getDataSource();
            self.setFormData({});
          }
        })
      }
    }
    self.setState({
      addvisible: false,
      ButtonState:true
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
      ButtonState:true,

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
  changebutton(state){
    console.log(state);
    this.setState({
      ButtonState:state
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
  changeAccessable(_id){
    Meteor.call('OrderStatus.AccessableUpdate',_id,function(error,result){
      if (!error) {
        console.log(result);
        if (!result.accessable){
          message.success('开通此关系！')
        }else{
          message.success('关闭此关系！！')
        }
      }
      else{
        message.success('操作失败')
      }
    })
  }
  handleSearchInput(str){
    let self = this ;
    let condition = {$or: [{sFrom:eval("/"+str+"/")},{sTo:eval("/"+str+"/")}]};
    Meteor.call('get.OrderState.byCondition',condition,function(err,alt){
      if (!err) {
        console.log(alt);
        self.setState({
          dataSource:alt
        })
      }
    })
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

           <Tooltip placement="topLeft" title="修改" arrowPointAtCenter>
             <Button shape="circle" icon="edit"  onClick={ () => this.onEditOrderStatus(record._id)}></Button>
           </Tooltip>
           <span className="ant-divider" />

           <Tooltip placement="topLeft" title="关闭此关系" arrowPointAtCenter>
             <Switch checkedChildren="打开" unCheckedChildren="关闭"  defaultChecked={record.accessable} onChange={() => this.changeAccessable(record._id)}  />
           </Tooltip>


         </span>

         )
       }
     },
   ]
   return (
     <div>
          <Button type="dashed" icon="plus" onClick={this.showModal}>添加状态</Button>

           <br /><br />
          <Input.Search
                placeholder="搜索关系相关"
                onSearch={value => console.log(value)}
                size="large"
                style={{ width: '75%' }}
                enterButton="Search"
                onInput={input => this.handleSearchInput(input.target.value) }
              />
           <br /><br />


          <Modal title="添加状态" visible={this.state.addvisible} onCancel={this.handleAddCancel} footer={[
            <Button key="back" onClick={this.handleAddCancel}>Return</Button>,
            <Button key="submit" type="primary"  disabled={this.state.ButtonState} onClick={this.handleAddOk}>
              Submit
            </Button>,
          ]} >
          <OrderStateForm OrderStatus={this.props.OrderStatus}  changebutton={this.changebutton.bind(this)}  modalState={this.props.modalState} getStatus={this.props.getStatus} ref = {(input) => { this.formComponent = input; }} />
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
