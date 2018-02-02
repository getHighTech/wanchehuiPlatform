import React from "react";
import {connect} from 'react-redux'
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import { go,push, replace, goBack } from 'react-router-redux';


class PermissonDenied extends React.Component{
  handleClick(){
    const { dispatch } = this.props;
    console.log("返回主页")
    dispatch(push("/"))
  }
  
  render(){
    const style = {
      height:400
    }
    const imgBlockStyle = {
    }
    return(
      <div style={style}>
         <Row>
          <Col span={8} offset={2}>
            <div className="imgBlock" style={imgBlockStyle}>
              <div className="imgEle" >
                <img style={imgBlockStyle} src='/img/403.svg' alt=""/>
              </div>
            </div>
          </Col>
          <Col span={8} offset={4}>
            <div className="content">
              <h1 style={{fontSize:66,color:'#434e59'}}>403</h1>
              <div style={{fontSize:20,marginBottom:16,color:'#434e59'}}>抱歉你无权访问该页面</div>
              <div>
                <Button type="primary" onClick={this.handleClick.bind(this)}>返回首页</Button>
              </div>
            </div>
          </Col>

        </Row>


      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(PermissonDenied)