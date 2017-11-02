//此组件用于分别显示各个用户的基本资料和情况
import React, { Component } from 'react';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';
import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style'

import UserBasicView from './UserBasicView.jsx';


class UserBasicViewPopover extends Component {
  state = {
    visible: false,
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  render() {
    return (
      <Popover
        content={
          <div>
            <UserBasicView username={this.props.username} loadState={this.state.visible}/>
          </div>
        }
        title={this.props.username}
        trigger="click"
        placement="bottom"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <a type="primary">{this.props.username}</a>
      </Popover>
    );
  }
}

export default UserBasicViewPopover;
