import React from "react";

import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';

import 'antd/lib/form/style';
import 'antd/lib/checkbox/style'


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
import ShopForm from './ShopForm.jsx';

class AddModal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible: false,
    }
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

  showModal(){
    this.setState({
      visible: true,
    });
    this.initAmap();
  }
  handleOk(){
    this.setState({
      visible: false,
    });
  }
  handleCancel(){
    this.setState({
      visible: false,
    });
  }

  handleFormSubmit(params){
    console.log(params);
  }

  render(){


    return(
      <div>
        <Tooltip placement="topLeft" title="添加新店铺" arrowPointAtCenter>
          <Button onClick={this.showModal.bind(this)} shape="circle" icon="plus"  style={{fontSize: "18px", color: "red"}} />
        </Tooltip>
        <Modal
          title="添加新店铺"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          maskClosable={false}
          style={{ top: 20 }}
        >
          <ShopForm submit={(params)=>this.handleFormSubmit.bind(this)}/>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(AddModal));
