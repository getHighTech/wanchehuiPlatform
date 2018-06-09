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
state={
  disable:true,
  initialProductClass:[]
}

DuplicateCheckLast = (rule,value,callback) => {
    let self  = this;
    const { getFieldValue } = this.props.form;
    let last = getFieldValue('last');
    let current = getFieldValue('current');
    let getresult= [];

    if(typeof(last)!='undefined'){

        for(var i = 0;i<last.length;i++){
          let newobj={current:last[i],next:current};
          Meteor.call('find.SameStatus',newobj,function(error,result){
            if (!error) {
              if(newobj.current==newobj.next){
                getresult.push('false');
                callback('当前状态'+newobj.current+'不能等同于前置状态'+newobj.next);
              }
              else {
                if(result!=0){
                  getresult.push('false')
                  callback('已存在'+newobj.current+'到'+newobj.next+'的关系');
                }
                else {
                  getresult.push('true');
                  callback();
                }
              }
              if(getresult.indexOf('false')==-1){
                self.props.changebutton(false)
              }
              else {
                self.props.changebutton(true)
              }
            }

          })

        }
    }


}

DuplicateCheckNext = (rule,value,callback) => {
    let self = this;
    const { getFieldValue } = this.props.form;
    let current = getFieldValue('current');
    let next = getFieldValue('next');
    let last = getFieldValue('last');
    let getresult= [];
    if(typeof(next)!='undefined'){
    for(var i = 0;i<next.length;i++){
      let newobj={current:current,next:next[i]};
      Meteor.call('find.SameStatus',newobj,function(error,result){
        if (!error) {
          if(result!=0){
            getresult.push('false')
            callback('已存在'+newobj.current+'到'+newobj.next+'的关系');
          }
          else {
            getresult.push('true')
            callback();
          }
          if(getresult.indexOf('false')==-1){
            self.props.changebutton(false)
          }
          else {
            self.props.changebutton(true)
          }
        }
      })
    }
  }
}

  change = (rule,value,callback) => {
        let self = this;
        const { getFieldValue } = this.props.form;
        let current = getFieldValue('current');
        if(current!=''){
          self.setState({
            disable:false
          })
          callback();
        }
        else {
          self.setState({
            disable:true
          })
          callback('此状态不能为空！')
        }
  }
  componentWillReceiveProps(nextProps){
    let self =this;
    const { getFieldValue } = this.props.form;
    if(current==''){
      this.props.form.resetFields();
    }
    if(typeof(current)=='undefined'){
      self.setState({
        disable:true
      })
    }
  }
  componentDidMount(){
    let self = this;
    Meteor.call('get.productclass',function(err,alt){
      if (!err) {
        self.setState({
          initialProductClass:alt
        })
      }
      else {
        console.log(err);
      }
    })
  }

render(){
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const {OrderStatus,modalState,getStatus}=this.props;
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
  const children = [];
  for (let i = 0; i < this.props.getStatus.length; i++) {
    children.push(<Option key={getStatus[i]} >{getStatus[i]}</Option>);
  }


  const type=this.state.initialProductClass;
  const Prochildren=[];
  for (var i = 0; i < type.length; i++) {
    Prochildren.push(<Option key={type[i]}>{type[i]}</Option>)
  }

  const productClassLength = [1];
  const productClass = productClassLength.map((k,index) => {
      return(
        <FormItem
        {...formItemLayout}
        label='商品分类'
          key={k}
        >
          {getFieldDecorator(`productClass`, {
            validateTrigger: ['onChange', 'onBlur'],
            // rules: [{ validator: this.proClassCheck }],

          })(
            <Select
            placeholder="选择商品分类"
            dropdownStyle={{zIndex:'99999' }}
            style={{ width: '60%' }}>
             {Prochildren}
           </Select>
          )}
        </FormItem>

      )

  })



  return(

    <Form>
        {productClass}


        <FormItem
            {...formItemLayout}
            label="前置状态"
            >
            {getFieldDecorator('last', {
              rules: [{validator: this.DuplicateCheckLast}]

            })(
              <Select
                    mode="tags"
                    disabled={this.state.disable}
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
            >
            {getFieldDecorator('current', {
                initialValue: this.props.OrderStatus.sFrom,
                rules: [{validator: this.change}]
            })(

                <Input className="shop-name-input"   prefix={<Icon type="user" id="error" style={{ fontSize: 13 }} />} placeholder="当前状态" />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="后置状态"
            >
            {getFieldDecorator('next', {
                initialValue: this.props.OrderStatus.sTo,
                rules: [{validator: this.DuplicateCheckNext}]
            })(

              <Select
                    mode="tags"
                    disabled={this.state.disable}
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
