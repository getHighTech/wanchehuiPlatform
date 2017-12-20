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
    dataSource:[]

  }
  handleCancel = (e) => {
    this.props.onCancel();
  }
  getRoleUsers(){
    let self = this
    let userIds = this.props.singleRole.users
    Meteor.call('user.findUsersbyUserIds',userIds,function(err,rlt){
      if(!err){
        self.setState({
          dateSource:rlt
        })
      }
    })
    console.log(self.state.dataSource)
  }
  render(){

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
    
    return(
      <Modal
      title="拥有该角色的用户"
      visible={this.props.userModalVisible}
      onCancel={this.handleCancel.bind(this)}
      footer = {null}
    >
      <Table dataSource={this.state.dataSource} columns={columns} />
    </Modal>
    )
  }
}

export default UserModal