//此组件用于分别显示各个用户的基本资料和情况
import React, { Component } from 'react';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';

import './UserBasicView.less';




class IncomeList extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        收入列表,可以有{this.props.count}行
      </div>
    )
  }
}

export default IncomeList;
