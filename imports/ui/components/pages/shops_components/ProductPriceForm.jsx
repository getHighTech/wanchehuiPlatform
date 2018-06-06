import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class ProductPriceFormWrap extends Component {
    constructor(props){
      super(props);
    }
render(){
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const {OrderStatus,modalState}=this.props;
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
            label="初始价格"
            hasFeedback
            >
            {getFieldDecorator('price', {
                initialValue: this.props.productprice/100,
                rules: [{ required: true, message: '商品价格不能为空'}]
            })(

                <Input className="shop-name-input"   prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品名称" />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="最终价格"
            hasFeedback
            >
            {getFieldDecorator('endPrice', {
                initialValue: this.props.productendprice/100,
                rules: [{ required: true, message: '商品价格不能为空'}]
            })(

                <Input className="shop-name-input"   prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品名称" />
            )}
        </FormItem>
    </Form>
  )
}


}

const ProductPriceForm = Form.create()(ProductPriceFormWrap);

export default ProductPriceForm;
