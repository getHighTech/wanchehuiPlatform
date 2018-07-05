import React, { Component } from 'react';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import { Button, Modal, Form, Input } from 'antd';
import { Table } from 'antd';
import "antd/lib/table/style";
import { Tooltip } from 'antd';
import { Popconfirm } from 'antd';

const FormItem = Form.Item;
import moment from 'moment'

class ProductClassWrap extends Component {
    state = {
       visible: false,
       AllClasses:[],
     }
     showModal = () => {
       this.setState({
         visible: true,
       });
     }

     handleOk = () => {
       let self = this
       const form = this.props.form; 
       //数据校验
       form.validateFields((err, fieldsValue) => {
         if (err) {
           return;
         }else{
           const FormData = form.getFieldsValue();
           console.log(FormData)
           Meteor.call('product_class.insert',FormData,function(err,rlt){
             if(!err){
               self.setState({
                 visible: false,
               });
               self.reflash()
               form.resetFields()
             }else{
              message.error(err.error);
               self.setState({
                 visible: false,
               });
               form.resetFields()
             }
           })

         }
        })
     }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  componentDidMount(){
    let self = this;
    self.reflash();
  }

  reflash(){
    let self =this;
    Meteor.call('get.all_product_classes',function(err,alt){
        if (!err) {
          self.setState({
            AllClasses:alt
          })
        }
        else {
          console.log(err);
        }
      })
    }

  delete(id){
    let self = this
    Meteor.call('product_class.remove', id,function(err,alt){
      if(!err){
        message.success('删除成功');
        self.reflash()
      }
    })
  }
  cancel(e) {
    message.error('取消删除');
  }
  render() {
    console.log(this.state.AllClasses)
    const columns = [{
      title: '中文名称',
      dataIndex: 'name_zh',
      key: 'name_zh',
    },{
      title: '英文标识',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => {
        return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
      }
  },
      { title: '操作', 
      dataIndex: '', 
      key: '_id', 
      render: (text, record) => {
        if (record.name === "advanced_card" || record.name === "common_card"){
          return(
            '该分类不允许删除'
          )
        }else{
          return (
            <span>
              <Popconfirm title="确定删除该分类吗?" onConfirm={() => this.delete(record._id)} onCancel={this.cancel} okText="是" cancelText="否">
                <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                  <Button shape="circle" icon="delete" ></Button>
                </Tooltip>
              </Popconfirm>
            </span>
          )
        }
      }
    },
];
    const { getFieldDecorator } = this.props.form;
    const  dataSource  = this.state.AllClasses

     return (
      <div>
        <Button type="dashed" onClick={this.showModal}  >
          <Icon type="plus" />添加分类
        </Button>
        <Modal
            title="新增分类"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form layout="vertical">
              <FormItem label="英文标识">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message:'分类英文标识必填' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="中文名">
                {getFieldDecorator('name_zh', {
                  rules: [{ required: true, message: '分类中文名必填' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="描述">
                {getFieldDecorator('description')(<Input  />)}
              </FormItem>
           </Form> 
          </Modal>

         <Table dataSource={dataSource} rowKey='_id' columns={columns} />


      </div>
     );
   }
 }

const ProductClass = Form.create()(ProductClassWrap);

export default ProductClass;