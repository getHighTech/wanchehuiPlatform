'use strict';

import React from "react";
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Switch from 'antd/lib/switch';
import "antd/lib/switch/style";
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import RoleModal from './roles_components/RoleModal.jsx';



class Roles extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalVisible: false,
      modalTitle:""
    }

  }

  onClickInsert = () => {
    this.setState({
      modalVisible: true,
      modalTitle:"新建一个角色"
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  hideModal = () => {
    this.setState({modalVisible: false});
  };


  render() {
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];
    
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    const headerMenuStyle ={
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      justifyContent: 'space-around',
      borderStyle: 'solid',
      padding: '15px',
      borderWidth: 'thin'
    };
    
    return (
      <div>
        <div style={headerMenuStyle}>
          <Tooltip placement="topLeft" title="增加新角色" arrowPointAtCenter>
            <Button shape="circle" icon="plus"  onClick={this.onClickInsert}  style={{fontSize: "18px", color: "red"}} ></Button>
          </Tooltip>

          {/* <CommonModal
          modalVisible={this.state.modalVisible}
          modalTitle={this.state.modalTitle}
          onCancel = { this.hideModal}
          getPageShops = {this.getPageShops.bind(this)}
          ref = {(input) => { this.fromModal = input; }}
          /> */}
          <RoleModal 
          modalVisible={this.state.modalVisible}
          modalTitle={this.state.modalTitle}
          onCancel = { this.hideModal}
          ref = {(input) => { this.fromModal = input; }}
          />
          <div>
          <Input.Search
                placeholder="搜索店铺相关"
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
                onInput={input => this.handleSearchInput(input.target.value) }
              />
          </div>
        </div>

        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Roles);
