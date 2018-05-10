import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;



class EditOrderStateFormWrap extends Component {
    constructor(props){
      super(props);
    }
render(){
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const {OrderStatus,modalState}=this.props;
  console.log(this.props.modalState);
  const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
  return(
    <Form>

        <FormItem
            {...formItemLayout}
            label="当前状态"
            hasFeedback
            >
            {getFieldDecorator('current', {
                initialValue: this.props.OrderStatus.sFrom,
                rules: [{ required: true, message: '商品名称不能为空'},{validator: this.handleConfirmName}]
            })(

                <Input className="shop-name-input"   prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品名称" />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="后置状态"
            hasFeedback
            >
            {getFieldDecorator('next', {
                initialValue: this.props.OrderStatus.sTo,
                rules: [{ required: true, message: '商品名称不能为空'},{validator: this.handleConfirmName}]
            })(

                <Input className="shop-name-input"   prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品名称" />
            )}
        </FormItem>
    </Form>
  )
}


}

const EditOrderStateForm = Form.create()(EditOrderStateFormWrap);

export default EditOrderStateForm;
