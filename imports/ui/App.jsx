import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import MenuItem from 'antd/lib/menu/MenuItem';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }

  renderTasks() {
    return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    const side_menu_group1 = [
      <MenuItem>菜单项</MenuItem>,
      <MenuItem>菜单项</MenuItem>,
      <MenuItem>菜单项</MenuItem>,
      ];
    return (
      <Layout>
        <Layout.Header>
          <Menu　theme="dark" mode="horizontal">
            <Menu.Item><a>Dashboard</a></Menu.Item>
            <Menu.SubMenu title="子菜单">
              <Menu.Item>子菜单项</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Header>
        <Layout>
          <Layout.Sider>
            <Menu　theme="dark" mode="inline">
              <Menu.ItemGroup title="子菜单" children={side_menu_group1}>
              </Menu.ItemGroup>
            </Menu>
          </Layout.Sider>
          <Layout.Content>main content</Layout.Content>
          <Layout.Sider>right sidebar</Layout.Sider>
        </Layout>
        <Layout.Footer>footer</Layout.Footer>
      </Layout>
    );
  }
}
