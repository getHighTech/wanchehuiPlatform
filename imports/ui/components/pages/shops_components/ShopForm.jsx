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
import {Link} from 'react-router'
import { Map } from 'react-amap';

class ShopFormWrap extends Component {

  constructor(props){
    super(props);
    this.state ={
      username: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      },
      password: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      },

    }
  }

  initAmap(){
    //地图加载
    var map = new AMap.Map("container", {
        resizeEnable: true
    });
    //输入提示
    var autoOptions = {
        input: "tipinput"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: map
    });  //构造地点查询类
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
    }
  }

  componentDidMount(){
    window.onload = function() {
    	map.plugin(["AMap.ToolBar"], function() {
    		map.addControl(new AMap.ToolBar());
    	});
    	if(location.href.indexOf('&guide=1')!==-1){
    		map.setStatus({scrollWheel:false})
    	}
    }
    this.initAmap();

  }

  handleSubmit = (e) => {
      e.preventDefault();
      let self = this;

      if (!this.checkBlank(this.props.form)) {
        return false;
      }
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values.userName == undefined) {
            self.setState({
              username: {
                validateStatus: "error",
                help: "用户名不得为空",
                hasFeedback: true,
              },
            });
            return false;
          }
          if (values.password == undefined) {
            self.setState({
              password: {
                validateStatus: "error",
                help: "密码不得为空",
                hasFeedback: true,
              },
            });
            return false;
          }

          self.setState({
            username: {
              validateStatus: "validating",
              help: "正在验证",
              hasFeedback: true
            },
            password: {
              validateStatus: "validating",
              help: "正在验证",
              hasFeedback: true
            }
          })
          self.props.loginInfo(values);

        }
      });
    }

    checkBlank(form){
      //判断空值的验证
      if (form.getFieldValue("userName") == "") {
        this.setState({
          username: {
            validateStatus: "error",
            help: "用户名不得为空",
            hasFeedback: true,
          },
        });
        return false;
      }
      if (form.getFieldValue("password") == "") {
        this.setState({
          password: {
            validateStatus: "error",
            help: "密码不得为空",
            hasFeedback: true,
          },
        })
        return false;
      }
      return true;
    }

    componentWillReceiveProps(nextProps){

    }
    render() {



      const { getFieldDecorator } = this.props.form;
      return (
        <Form style={{height: "700px"}} onSubmit={this.handleSubmit} className="login-form" id="sysLogForm">
          <FormItem label="店铺名称" validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}>
            {getFieldDecorator('userName')(
              <Input placeholder="店铺名称" />
            )}
          </FormItem>
          <FormItem label="店铺地理位置" validateStatus={this.state.password.validateStatus} hasFeedback={this.state.password.hasFeedback} help={this.state.password.help}>
            {getFieldDecorator('password')(
              <Input type="text" placeholder="店铺地理位置" />
            )}
          </FormItem>
           
          <FormItem label="店铺详细地址" validateStatus={this.state.password.validateStatus} hasFeedback={this.state.password.hasFeedback} help={this.state.password.help}>
            {getFieldDecorator('password')(
              <Input type="text" placeholder="街道，几号,几楼等" />
            )}
          </FormItem>


        </Form>
      );
    }
  }

const ShopForm = Form.create()(ShopFormWrap);
export default ShopForm;
