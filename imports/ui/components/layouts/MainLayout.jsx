import React, { Component } from 'react';
import { push, replace, goBack } from 'react-router-redux';

import { connect } from 'react-redux';
import message from 'antd/lib/message';
import "antd/lib/message/style";
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Layout from 'antd/lib/layout';
const { Header, Content, Footer, Sider } = Layout;
import "antd/lib/layout/style";
import "antd/lib/menu/style";
import "antd/lib/icon/style";


import PageHeader from "./PageHeader.jsx";
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from '/imports/api/roles/roles.js';
class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActiveKey: "dashboard"
    }

  }
  componentDidMount(){
    if (Meteor.userId() == null) {
      //若是已经登录 就返回主页
      const { dispatch } = this.props;
      dispatch(push("/login"));
      message.warning("请先登录！")
    }
    const pathname = this.props.routing.locationBeforeTransitions.pathname;
    switch (pathname) {
      case "/":
      this.setState({
        menuActiveKey: 'dashboard'
      });
      break;
      default:

    }
    $(document).ready(function(){
      $(this).unbind("click").on('click',function(e){
        if ($(e.target).hasClass("on-dev-unfinished")) {
          message.warning("仍然在开发中，敬请期待");
        }
      });
    });


  }
  handleMenuItemClicked(item){
    const key = item.key;
    const { dispatch } = this.props;
    switch (key) {
      case 'dashboard':
        dispatch(push('/'));
        break;
      case 'roles':
        dispatch(push('/roles'));
        break;
      case 'users':
        dispatch(push('/users'));
        break;
      case 'orders':
        dispatch(push('/orders'));
        break;
      case 'shops':
        dispatch(push('/shops'));
        break;
      case 'settings':
        dispatch(push('/settings'));
        break;
      case 'agency_relations':
        dispatch(push('/agencies_relations'));
        break;
      case 'component_test':
        dispatch(push('/component_test'));
        break;
      default:
        dispatch(push('/'));
        break;
    }
  }


  render() {
    return(  <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            //console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark"
          mode="inline" defaultSelectedKeys={[this.state.menuActiveKey]}
          onClick={this.handleMenuItemClicked.bind(this)}
          >
            <Menu.Item key="dashboard">
              <Icon type="bars" />
              <span className="nav-text">控制面板</span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="user" />
              <span className="nav-text">用户管理</span>
            </Menu.Item>
            <Menu.Item key="shops">
              <Icon type="shop" />
              <span className="nav-text">店铺管理</span>
            </Menu.Item>
            <Menu.Item key="orders">
              <Icon type="book" />
              <span className="nav-text">订单管理</span>
            </Menu.Item>
            <Menu.Item key="agency_relations">
              <Icon type="paper-clip" />
              <span className="nav-text">分销关系管理</span>
            </Menu.Item>
            <Menu.Item key="roles">
              <Icon type="paper-clip" />
              <span className="nav-text">角色管理</span>
            </Menu.Item>
            <Menu.Item key="settings">
              <Icon type="setting" />
              <span className="nav-text">系统设置</span>
            </Menu.Item>
            <Menu.Item key="logs">
              <Icon type="paper-clip" />
              <span className="nav-text">系统日志</span>
            </Menu.Item>
            <Menu.Item key="component_test">
              <Icon type="paper-clip" />
              <span className="nav-text">组件测试页面</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
                <PageHeader path={this.props.location}/>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div >

              <div className="ant-layout-main">

                <div className="ant-layout-container">
                  <div className="ant-layout-content">
                    <div style={{ height: "auto" }}>
                      {this.props.children}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            SimonXu ©2017 MIT
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(MainLayout));
