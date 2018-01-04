import React from "react";
import { connect } from 'react-redux';

import {getUserByAgencyId} from '/imports/ui/services/users.js'
import UserBasicViewPopover from '../../pages/tools/UserBasicViewPopover.jsx';

import {getOneUser} from '/imports/ui/actions/current_deal_user.js';


import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Modal from 'antd/lib/modal';
import "antd/lib/modal/style";
import Select from 'antd/lib/select';
import "antd/lib/select/style";
import message from 'antd/lib/message';
import "antd/lib/message/style";


// ant-select-dropdown-hidden
const actionStyle = {
   fontSize: 16, color: '#08c'
};
const Option = Select.Option;

class UserOreas extends React.Component {
  constructor(props){
    super(props);

  }
  state = { 
    visible: false,
    roleList:[]
  }
  showModal = () => {
    let self = this
    Meteor.call('user.get.roleIds',self.props.userId,function(err,rlt){
      console.log(rlt)
      if(!err){
        self.setState({
          visible: true,
          roleList: rlt
        });
      }
    })
     
  }

  handleOk = (e) => {
    console.log(e);
    let self = this
    let UserId = self.props.userId
    console.log(UserId)
    console.log(self.state.roleList)
    if(UserId){
      console.log("用户存在")
      Meteor.call('user.UserBindingRoles',UserId, self.state.roleList,function(err,rlt){
        if(!err){
          message.success('用户绑定角色成功');
          self.setState({
            visible: false,
            roleList:[]
          });
        }
      })
    }else(
      console.log("用户不存在")
    )
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      roleList:[]
    });
    console.log(this.state.roleList)

  }


  
   handleChange(value) {
    console.log(`selected ${value}`);
    this.setState({
      roleList:value
    })
    console.log(this.state.roleList)
  }
  render(){
    const {dispatch, CurrentDealUser, allRoles} = this.props;
    const children = [];
    for(let i =0; i < this.props.allRoles.length; i++ ){
      children.push(<Option key={allRoles[i]._id}>{allRoles[i].name_zh}</Option>)
    }
    return (
      <span>
        <Tooltip placement="topLeft" title="查看详情" arrowPointAtCenter>
          <Button className="on-dev-unfinished" shape="circle" icon="eye"  style={actionStyle} />
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip placement="topLeft" title="封号" arrowPointAtCenter>
          <Button  className="on-dev-unfinished" shape="circle" icon="lock"  style={actionStyle} />
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip placement="topLeft" title="重置密码" arrowPointAtCenter>
          <Button  className="on-dev-unfinished" shape="circle" icon="key"  style={actionStyle} />
        </Tooltip>
        {/* <span className="ant-divider" />
        <Tooltip placement="topLeft" title="删除用户" arrowPointAtCenter>
          <Button onClick={()=> dispatch(getOneUser(this.props.userId, "remove"))}  shape="circle" icon="minus"  style={actionStyle} />
        </Tooltip> */}
        <span className="ant-divider" />
        <Tooltip placement="topLeft" title="给用户赋予角色" arrowPointAtCenter>
          <Button  onClick={this.showModal}  shape="circle" icon="tool"  style={actionStyle} />
        </Tooltip>
        <Modal
          title="设置角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <h3>为该用户添加角色</h3>
          <Select
          mode="multiple"
          style={{ width: '100%' }}
          defaultValue={this.state.roleList}
          placeholder="Please select"
          dropdownStyle={{zIndex:'99999' }}
          onChange={this.handleChange.bind(this)}
          >
          {children}
          </Select>
        </Modal>
      </span>
    )

  }
}

function mapStateToProps(state) {
  return {
      allRoles:state.RolesList.allRoles,
      CurrentDealUser: state.CurrentDealUser,
   };
}

export default connect(mapStateToProps)(UserOreas);
