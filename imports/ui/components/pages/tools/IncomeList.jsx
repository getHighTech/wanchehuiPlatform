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

  componentWillReceiveProps(nextProps){

  }

  render(){
    const incomeListItems = this.props.data.map((item, index)=>{
      return (
        <div key={index} style={{textAlign: "center", width: "375px"}}>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{width: "40px", wordBreak: 'break-all'}}>来自<br/>{item.agencyUser.username}</div>
            <div  style={{width: "40px", wordBreak: 'break-all'}}>{item.text}</div>
            <div  style={{width: "40px", wordBreak: 'break-all'}}>{item.amount/100}元</div>
            <div style={{width: "40px", wordBreak: 'break-all'}}>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
          </div>
          <hr/>
        </div>
      )
    })
    return(
      <div>
        {incomeListItems}

      </div>
    )
  }
}

export default IncomeList;
