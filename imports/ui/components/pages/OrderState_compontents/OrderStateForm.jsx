import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, Icon, Input, Button } from 'antd';
import "antd/lib/modal/style";
import { Select, Radio } from 'antd';
import 'antd/dist/antd.css';
const FormItem = Form.Item;
const Option = Select.Option;


function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class OrderStateFormWrap extends Component {
    constructor(props){
      super(props);
    }
render(){
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const {OrderStatus,modalState,getStatus}=this.props;
  const children = [];
  for (let i = 0; i < this.props.getStatus.length; i++) {
    children.push(<Option key={getStatus[i]} >{getStatus[i]}</Option>);
  }


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
            label="前置状态"
            hasFeedback
            >
            {getFieldDecorator('last', {
            })(

              <Select
                    mode="tags"
                    placeholder="Please select"
                    onChange={handleChange}
                    dropdownStyle={{zIndex:'99999' }}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
            )}
        </FormItem>
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
            })(

              <Select
                    mode="tags"
                    placeholder="Please select"
                    onChange={handleChange}
                    dropdownStyle={{zIndex:'99999' }}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
            )}
        </FormItem>
    </Form>



  )
}


}

const OrderStateForm = Form.create()(OrderStateFormWrap);

export default OrderStateForm;
