import React, { Component } from 'react'
import { Table,Button,Modal,Form,Input,message,Select,Tooltip,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


//新增状态表单

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加新用户"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="用户名">
              {getFieldDecorator('name_zh', {
                rules: [{ required: true, message: '状态名字必须填写' }],
              })(
                <Input  placeholder="请填写用户名" />
              )}
            </FormItem>
              <FormItem label="电话">
                {getFieldDecorator('name_zha', {
                  rules: [{ required: true, message: '状态名字必须填写' }],
                })(
                  <Input  placeholder="请填写电话号码" />
                )}
              </FormItem>
                <FormItem label="地址">
                  {getFieldDecorator('name_zhd', {
                    rules: [{ required: true, message: '状态名字必须填写' }],
                  })(
                    <Input  placeholder="请填写地址"/>
                  )}
                </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: '英文标识必须填写' }],
                })(
                  <Input   placeholder="请填写邮箱"/>
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
    handleChangeFrom(value){
      console.log(`Selected: ${value}`);
    }
    handleChangeTo(value){
      console.log(`Selected: ${value}`);
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const status =this.props.allStatus;
      const children=[];
      for (var i = 0; i < status.length; i++) {
        children.push(<Option key={status[i].name}>{status[i].name_zh}</Option>)
      }
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
            <FormItem label="选择起点状态">
              {getFieldDecorator('sFrom', {
                rules: [{ required: true, message: '起点状态必须填写' }],
              })(
                <Select
                  onChange={this.handleChangeFrom}
                  style={{ width: '100%' }}
                  dropdownStyle={{zIndex:'99999' }}
                >
                  {children}
                </Select>
              )}
            </FormItem>
            <FormItem label="选择终点状态">
              {getFieldDecorator('sTo', {
                  rules: [{ required: true, message:'终点状态必须填写' }],
                })(
                  <Select
                  onChange={this.handleChangeTo}
                  dropdownStyle={{zIndex:'99999' }}
                  style={{ width: '100%' }}
                >
                  {children}
                </Select>
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
      relationVisible:false,
      allStatus:[],
      dataSource:[]
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
      console.log('Received values of form: ', values);
      Meteor.call('order_status.insert',values,function(err,alt){
        if(!err){
          message.success('状态添加成功');
          form.resetFields();
          self.setState({ visible: false });
          Meteor.call('get.all_status',function(err,rlt){
            if(!err){
              console.log(rlt)
              self.setState({
                allStatus:rlt
              })
            }
          })
        }else{
          message.error(err.error);
        }
      })

    });
  }

  handleRelationCreate = () => {
    let self = this
    const form = this.relationformRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      Meteor.call('order_status_accesses.insert',values,function(err,alt){
        if(!err){
          message.success('设置成功');
          form.resetFields();
          self.getDataSource();
          self.setState({ relationVisible: false });
        }else{
          message.error(err.error);
        }
      })
    });
  }

  componentDidMount(){
    let self = this
    self.getDataSource();
    Meteor.call('get.all_status',function(err,rlt){
      if(!err){
        console.log(rlt)
        self.setState({
          allStatus:rlt
        })
      }
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  saveRelationFormRef = (relationformRef) => {
    this.relationformRef = relationformRef;
  }
  getDataSource(){
    let self = this;
    Meteor.call('get.all.OrderStatusAccesses',function(err,rlt){
      self.setState({
        dataSource:rlt
      })
    })
  }


  handleSearchInput(str){
    let self = this ;
    let condition = {$or: [{sFrom:eval("/"+str+"/")},{sTo:eval("/"+str+"/")}]};
    Meteor.call('get.user.byCondition',condition,function(err,alt){
      if (!err) {
        console.log(alt);
        self.setState({
          dataSource:alt
        })
      }
    })
  }
  confirm(id) {
    console.log(id);
    let self = this
    Meteor.call('delete.user_access',id,function(err,alt){
      if(!err){
        message.success('删除成功')
        self.getDataSource();
      }else{
        message.error(err.error)
      }
    })
  }
  cancel(e) {
  }

  render() {
    const columns = [
      {title:'用户名',width:200,dataIndex:'sFrom',key:'sFrom'},
      {title:'电话',width:200,dataIndex:'sNumber',key:'sTo'},
      {title:'地址',width:200,dataIndex:'sTo',key:'sFrom'},
      {title:'邮箱',width:200,dataIndex:'sEmail',key:'sTo'},
      {
        title: '状态操作',
        key: 'action',
        width: 200,
        render: (text,record) => {
          return(
            <span>
              <Popconfirm title="是否删除该用户" onConfirm={ () => this.confirm(record._id)} onCancel={this.cancel} okText="是" cancelText="否">
                  <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                    <Button shape="circle" icon="delete" ></Button>
                  </Tooltip>
                </Popconfirm>

                <Popconfirm  onConfirm={ () => this.confirm(record._id)} onCancel={this.cancel} okText="是" cancelText="否">
                    <Tooltip placement="topLeft" title="编辑" arrowPointAtCenter>
                      <Button shape="circle" icon="edit" ></Button>
                    </Tooltip>
                  </Popconfirm>
            </span>
          )
        }
      },
    ]
    return (
      <div>
        <Button type="primary" icon="plus"  onClick={this.showModal}>增加新用户</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />

        <StateRelationShipCreateForm
          wrappedComponentRef={this.saveRelationFormRef}
          visible={this.state.relationVisible}
          onCancel={this.handleRelationCancel}
          onCreate={this.handleRelationCreate}
          allStatus={this.state.allStatus}
        />
        <br /><br />
        <Input.Search
              placeholder="搜索用户"
              onSearch={value => console.log(value)}
              size="large"
              style={{ width: '75%' }}
              enterButton="Search"
              onInput={input => this.handleSearchInput(input.target.value) }
            />
        <br /><br />
        <Table columns={columns}  dataSource={this.state.dataSource} />
      </div>
     );
  }
}

export default OrderStates;
