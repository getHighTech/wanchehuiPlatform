import React, { Component } from 'react';
import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import "antd/lib/form/style";
import "antd/lib/icon/style";
import "antd/lib/input/style";
import "antd/lib/button/style";
import "antd/lib/checkbox/style";
const FormItem = Form.Item;
import {Link} from 'react-router';

import AMapSearcher from '../tools/AMapSearcher.jsx';


class ShopFormWrap extends Component {

    constructor(props){
      super(props);

    }



    componentDidMount(){


    }

    handleSubmit = (e) => {

      }



    componentWillReceiveProps(nextProps){

    }
    render() {



      const { getFieldDecorator } = this.props.form;
      return (
        <Form style={{height: "700px"}} onSubmit={this.handleSubmit} className="login-form" id="sysLogForm">
          <FormItem label="店铺名称"  >
            {getFieldDecorator('userName')(
              <Input placeholder="店铺名称" />
            )}
          </FormItem>
          <FormItem label="店铺地理位置" >
            <AMapSearcher />
          </FormItem>

          <FormItem label="店铺详细地址">
            {getFieldDecorator('addressDetail')(
              <Input type="text" placeholder="街道，几号,几楼等" />
            )}
          </FormItem>


        </Form>
      );
    }
  }

const ShopForm = Form.create()(ShopFormWrap);
export default ShopForm;
