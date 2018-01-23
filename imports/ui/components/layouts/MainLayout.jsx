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
import { getCurrentRoles,createMeunList } from '/imports/ui/actions/roles.js';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActiveKey: "dashboard"
    }

  }
  componentDidMount(){
    let SuperAdminMenu = [
      {"key": "dashboard", "name": "控制面板", "IconType": "bars"},
      {"key": "users", "name": "用户管理", "IconType": "user"},
      {"key": "shops", "name": "店铺管理", "IconType": "shop"},
      {"key": "orders", "name": "订单管理", "IconType": "book"},
      {"key": "withdrawals", "name": "提现管理", "IconType": "pay-circle-o"},
      {"key": "roles", "name": "角色管理", "IconType": "paper-clip"},
      {"key": "settings", "name": "系统设置", "IconType": "setting"},
      {"key": "logs", "name": "系统日志", "IconType": "paper-clip"},
      {"key": "component_test", "name": "测试组件", "IconType": "paper-clip"}
    ]
    let ShopOwnerMenu = [
      {"key": "dashboard", "name": "控制面板", "IconType": "bars"},
      {"key": "single_shop", "name": "店铺管理", "IconType": "shop"},
      {"key": "orders", "name": "订单管理", "IconType": "book"}

    ]
    let self = this
    if (Meteor.userId() == null) {
      //若是已经登录 就返回主页
      const { dispatch } = this.props;
      dispatch(push("/login"));
      message.warning("请先登录！")
    }else{
      const { dispatch } = this.props;
      let userId = Meteor.userId()
      Meteor.call('roleNames.find_by_user_id',userId, function(err,rlt){
        dispatch(getCurrentRoles(rlt));
        if(rlt.indexOf('superAdmin') == -1){
          console.log("不是超级管理员")
          dispatch(createMeunList(ShopOwnerMenu))
        }else{
          console.log("超级管理员")
          dispatch(createMeunList(SuperAdminMenu))
        }
        // console.log('将角色存入REDUX')

        console.log(self.props)



      })
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
      case 'withdrawals':
        dispatch(push('/withdrawals'));
        break;
      case 'shops':
        dispatch(push('/shops'));
        break;
      case 'single_shop':
      dispatch(push('/shops/single_shop/'));
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
    const { LeftMenuList } = this.props;

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
          	{
              this.props.LeftMenuList.map((e, index) =>
              <Menu.Item key={e.key}>
                    <Icon type={e.IconType} />
                    <span className="nav-text">{e.name}</span>
              </Menu.Item>
              )
            }
           {/* <Menu.Item key="dashboard">
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
            <Menu.Item key="withdrawals">
              <Icon type="pay-circle-o" />
              <span className="nav-text">提现管理</span>
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
            </Menu.Item> */}
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
    routing: state.routing,
    currentRoles:state.RolesList.currentRoles,
    LeftMenuList:state.RolesList.LeftMenuList,
   };
}

export default connect(mapStateToProps)(MainLayout);
