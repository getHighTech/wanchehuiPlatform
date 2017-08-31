import React from 'react';
import {Link} from 'react-router-dom'
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import Icon from 'antd/lib/icon/';
import Button from 'antd/lib/button/';
import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/layout/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';
import 'antd/lib/dropdown/style';

const menu = (
  <Menu>
    <Menu.Item>
    <Link to="/个人中心">
      <Icon type="file-text" />
      <span className="nav-text">个人中心</span>
    </Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/about">
      <Icon type="file-text" />
      <span className="nav-text">修改个人资料</span>
    </Link>
    </Menu.Item>

    <Menu.Item>
    <Link to="/login" onClick={logOut()}>
      <Icon type="file-text" />
      <span className="nav-text">安全退出</span>
    </Link>
    </Menu.Item>
  </Menu>
);
function logOut(e){
  Meteor.logout(function(){
    console.log("logout");
  });
}

const HeaderUserArea = () => (
  <Dropdown overlay={menu}>
    <Button  style={{ marginLeft: 8,
    display: "inline-block", }}>
      用户名 <Icon type="down" />
    </Button>
 </Dropdown>
)

export default HeaderUserArea;
