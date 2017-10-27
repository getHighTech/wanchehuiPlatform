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


import UserFinder from './UserFinder';

class UserFinderModal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible: false,
    }
  }

  showModal(){
    this.setState({
      visible: true,
    });
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

  getUserId(userId){
    this.props.getUserId(userId);
    this.setState({
      visible: false,
    });
  }

  render(){


    return(
      <div>
        <Tooltip placement="topLeft" title="查找并选择用户" arrowPointAtCenter>
          <Button onClick={this.showModal.bind(this)} shape="circle" icon="user"  style={{fontSize: "18px", color: "red"}} />
        </Tooltip>
        <Modal
          title="查找并选择用户"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          closable={false}
          maskClosable={true}
          style={{ top: 20 }} footer={null}
        >
        <UserFinder getUserId={(userId) =>  this.getUserId(userId)} />
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
  }
},connect(mapStateToProps)(UserFinderModal));
