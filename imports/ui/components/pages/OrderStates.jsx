import React, { Component } from 'react'
import { Table, Icon, Divider,Button,Modal,Form,Input,message } from 'antd';
const FormItem = Form.Item;

//新增状态表单

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增订单状态"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="状态名字">
              {getFieldDecorator('name_zh', {
                rules: [{ required: true, message: '状态名字必须填写' }],
              })(
                <Input  placeholder="请填写中文名，不超过26个字符" />
              )}
            </FormItem>
            <FormItem label="英文标识">
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: '英文标识必须填写' }],
                })(
                  <Input   placeholder="请填写英文名，不超过26个字符" />
                )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

// 新增状态关系表单
const StateRelationShipCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="设置状态关系"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="状态名字">
              {getFieldDecorator('name_zh', {
                rules: [{ required: true, message: '状态名字必须填写' }],
              })(
                <Input  placeholder="请填写中文名，不超过26个字符" />
              )}
            </FormItem>
            <FormItem label="英文标识">
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: '英文标识必须填写' }],
                })(
                  <Input   placeholder="请填写英文名，不超过26个字符" />
                )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class OrderStates extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      relationVisible:false
     }
  }
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }
  showRelationModal = () => {
    this.setState({ relationVisible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleRelationCancel = () => {
    this.setState({ relationVisible: false });
  }

  handleCreate = () => {
    let self = this
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // console.log('Received values of form: ', values);
      Meteor.call('order_status.insert',values,function(err,alt){
        if(!err){
          message.success('状态添加成功');
          form.resetFields();
          self.setState({ visible: false });
        }else{
          message.error(err.error);
        }
      })
     
    });
  }
  handleRelationCreate = () => {
    let self = this
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('获取关系参数: ', values);
      // Meteor.call('order_status.insert',values,function(err,alt){
      //   if(!err){
      //     message.success('状态添加成功');
      //     form.resetFields();
      //     self.setState({ visible: false });
      //   }else{
      //     message.error(err.error);
      //   }
      // })
     
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  saveRelationFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() { 
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Action 一 {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <Divider type="vertical" />
          <a href="javascript:;" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];
    const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }];
    return ( 
      <div>
        <Button type="primary" icon="plus"  onClick={this.showModal}>增加新状态</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        
        <Button type="primary" icon="tool"  onClick={this.showRelationModal}>设置状态关系</Button>
        <StateRelationShipCreateForm
          wrappedComponentRef={this.saveRelationFormRef}
          visible={this.state.relationVisible}
          onCancel={this.handleRelationCancel}
          onCreate={this.handleRelationCreate}
        />
        <Table columns={columns} dataSource={data} />
      </div>
     );
  }
}
 
export default OrderStates;



