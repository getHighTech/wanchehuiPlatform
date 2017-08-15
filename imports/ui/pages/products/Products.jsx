import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import Icon from 'antd/lib/icon/';
import Spin from 'antd/lib/spin/';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';
import 'antd/lib/spin/style';
import 'antd/lib/icon/style';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// App component - represents the whole app
class Products extends Component {
  state = {
   current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return(
      <div style={{ padding: 5, background: '#fff', minHeight: 360, textAlign: "center" }}>
      <Menu
           onClick={this.handleClick}
           selectedKeys={[this.state.current]}
           mode="horizontal"
         >
           <Menu.Item key="online">
             <Icon type="online" />上架商品
           </Menu.Item>
           <Menu.Item key="offline">
             <Icon type="offline" />下架商品
           </Menu.Item>
           <SubMenu title={<span><Icon type="setting" />管理</span>}>
             <MenuItemGroup title="数据">
               <Menu.Item key="setting:1">新建商品</Menu.Item>
               <Menu.Item key="setting:2">检索</Menu.Item>
             </MenuItemGroup>
             <MenuItemGroup title="统计">
               <Menu.Item key="setting:1">今日数据</Menu.Item>
               <Menu.Item key="setting:2">本月数据</Menu.Item>
               <Menu.Item key="setting:3">本季度数据</Menu.Item>
             </MenuItemGroup>
           </SubMenu>
         </Menu>
        <div>
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </div>
        <h3>数据加载中，请稍后</h3>
      </div>
    )

  }
}

export default Products;
