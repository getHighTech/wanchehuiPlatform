import React from "react";

import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';

import 'antd/lib/form/style';
import 'antd/lib/checkbox/style'


import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
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
    if (data.type="changeSuperAgency") {
      console.log("响应改变上级代理状态");
      confirm({
         title: '改变上级代理确认',
         content: '一旦你确认改变，之前的代理将损失已经获取的佣金，你选择的用户将得到一笔新的佣金,是否确认(请慎重操作)？',
         onOk() {
           return new Promise((resolve, reject) => {
             console.log(resolve);
             console.log(reject);
             return reject();
            //  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch((e) => {
            console.log(e);
            console.log('Oops errors!');
            return reject();
          });

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
  return {

   };
}

export default connect(mapStateToProps)(UserFinderModal);
