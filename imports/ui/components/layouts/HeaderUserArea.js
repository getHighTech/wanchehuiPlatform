import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import Icon from 'antd/lib/icon/';
import Button from 'antd/lib/button/';
import message from 'antd/lib/message/';
import 'antd/lib/message/style';
import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/layout/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';
import 'antd/lib/dropdown/style';

class HeaderUserArea extends React.Component {
  constructor(props) {
    super(props);
    let state = {
      username: "载入中"
    }
  }
  componentDidMount(){
    // let username = Meteor.user().username;
  }
  loutOut(e){
    const { dispatch } = this.props;
    Meteor.logout(function(){
      dispatch(push('/login'));
      message.success("您已经安全的退出了！")
    })

  }

  render(){
    const menu = (
      <Menu>
        <Menu.Item>
        <Link to="/my">
          <Icon type="file-text" />
          <span className="nav-text">个人中心</span>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link to="/messages">
          <Icon type="file-text" />
          <span className="nav-text">消息</span>
        </Link>
        </Menu.Item>

        <Menu.Item>
        <a onClick={this.loutOut.bind(this)}>
          <Icon type="file-text" />
          <span className="nav-text">安全退出</span>
        </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Button  style={{ marginLeft: 8,
        display: "inline-block", }}>
          用户名 <Icon type="down" />
        </Button>
     </Dropdown>
    );
  }
}


function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(HeaderUserArea);
