//此组件用于分别显示各个用户的基本资料和情况
import React, { Component } from 'react';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';
import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style'
import { connect } from 'react-redux';

import UserBasicView from './UserBasicView.jsx';

import {getOnePageIncomes} from '/imports/ui/actions/current_deal_user.js';

class UserBasicViewPopover extends Component {
  state = {
    visible: false,
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange(visible){
    const {dispatch, userId} = this.props;
    if (visible) {
      dispatch(getOnePageIncomes(userId, "lookup"));

    }else{
      dispatch(getOnePageIncomes(null, "clear"));

    }
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
        onVisibleChange={this.handleVisibleChange.bind(this)}
      >
        <a type="primary">{this.props.username}</a>
      </Popover>
    );
  }
}
function mapStateToProps(state) {
  return {
      CurrentDealUser: state.CurrentDealUser
   };
}

export default connect(mapStateToProps)(UserBasicViewPopover);
