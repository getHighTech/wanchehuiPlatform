'use strict';


import React from 'react';
import { push, replace, goBack } from 'react-router-redux';

import { connect } from 'react-redux';
import { Layout, Menu, Icon, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import "antd/lib/layout/style";
import "antd/lib/menu/style";
import "antd/lib/icon/style";
import "antd/lib/message/style";

import PageHeader from "./PageHeader.jsx";

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    if (Meteor.userId() == null) {
      //若是已经登录 就返回主页
      const { dispatch } = this.props;
      dispatch(push("/login"));
      message.warning("请先登录！")
    }
  }


  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
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
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>


    );
  }
}

function mapStateToProps(state) {
  return {
   };
}

export default connect(mapStateToProps)(MainLayout);
