import React from "react";
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import Table from 'antd/lib/table';
import 'antd/lib/table/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';

class UserModal extends React.Component {

  constructor(props){
    super(props);
  }
  state = {
    users:"oooo",

  }
  handleCancel = (e) => {
    this.props.onCancel();
  }

  render(){

    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '电话',
      dataIndex: 'profile[mobile]',
      key: 'profile[mobile]',
    }];
    
    return(
      <Modal
      title="拥有该角色的用户"
      visible={this.props.userModalVisible}
      onCancel={this.handleCancel.bind(this)}
      footer = {null}
    >
      <Table dataSource={this.props.userDatas} columns={columns} />
    </Modal>
    )
  }
}

export default UserModal