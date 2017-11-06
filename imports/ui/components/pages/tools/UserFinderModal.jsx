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
import message from 'antd/lib/message';
import 'antd/lib/message/style'

import UserFinder from './UserFinder';
import { changeSuperAgency, getAgencyByUserId } from '../../../services/agencies.js';


const confirm = Modal.confirm;


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

  selectClose(userId, data){
    if (data.type === "changeSuperAgency") {
      confirm({
        title: '你是否确认更改此用户的上级？（请谨慎操作）',
        content: '如果您确认了更改，意味着原来的上级的的关系链失去其奖励，更新的关系链条就获得这个用户的销售奖励！！',
        onOk() {
          return getAgencyByUserId(userId, function(err,rlt){
            console.log(err);
            console.log(rlt);
            if (!err) {

              if (rlt!= "AGENCY NOT FOUND") {
                changeSuperAgency(
                  data.record._id,
                  rlt._id,
                  {
                    type: "agencyCard",
                    agencyId: rlt._id
                  },
                  {
                    type: "refund",
                    userId: data.record.userid,
                    recyclerId: '',
                  },
                  data.record.productId,
                  function(err, rlt){
                    console.log(err);
                    console.log(rlt);
                    if (!err) {
                      if (rlt === "BALANCE NOT FOUND IN addMountToBalance") {
                        message.warn("更改成功，留意：您选择的用户没有上级代理为系统代理!");
                      }
                      if (rlt === "AGENCY STILL") {
                        message.error("错误!!当前上级就是您选择的上级");

                      }
                    }
                  });
              }else{
                message.error("该用户没有分销权，请重新选择用户！");
              }
            }
            });


            // setTimeout(resolve, 1000);

        },
        onCancel() {},
      });
    }

    this.setState({
      visible: false,
    });
  }

  render(){


    return(
      <div>
        <Tooltip placement="topLeft" title={this.props.text} arrowPointAtCenter>
          <Button onClick={this.showModal.bind(this)} shape="circle" icon="user"  style={{fontSize: "18px", color: "red"}} />
        </Tooltip>
        <Modal
          title={this.props.text}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          closable={false}
          maskClosable={true}
          style={{ top: 20 }} footer={null}
        >
        <UserFinder extraBackData={this.props.extraBackData} selectClose={(userId, data)=>this.selectClose(userId, data)}  />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
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
