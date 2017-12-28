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


// ant-select-dropdown-hidden
const actionStyle = {
   fontSize: 16, color: '#08c'
};
const Option = Select.Option;

class UserOreas extends React.Component {
  constructor(props){
    super(props);

  }
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  
   handleChange(value) {
    console.log(`selected ${value}`);
  }
  render(){
    const {dispatch, CurrentDealUser} = this.props;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
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
          title="为该用户添加角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null} 
          id='area'
          style={{height:200}}
        >
          <h3>所有角色列表</h3>
          <Select
          mode="multiple"
          style={{ width: '100%', zIndex:'1000' }}
          placeholder="Please select"
          defaultValue={['a10', 'c12']}
          onChange={this.handleChange.bind(this)}
          // getPopupContainer={() => document.getElementById('area')}
          dropdownClassName="abc"
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

      CurrentDealUser: state.CurrentDealUser,
   };
}

export default connect(mapStateToProps)(UserOreas);
