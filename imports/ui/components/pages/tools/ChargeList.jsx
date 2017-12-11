//此组件用于分别显示各个用户的基本资料和情况
import React, { Component } from 'react';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';

import './UserBasicView.less';




class ChargeList extends Component {

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
    const chargeListItems = this.props.data.map((item, index)=>{
      console.log(item.bank);
      return (
        <div key={index}>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{width: "40px", wordBreak: 'break-all'}}>到银行卡<br/>{item.bank.bankAddress}</div>
            <div  style={{width: "40px", wordBreak: 'break-all'}}>{item.text}</div>
            <div  style={{width: "40px", wordBreak: 'break-all'}}>{item.money/100}元</div>
            <div style={{width: "40px", wordBreak: 'break-all'}}>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
          </div>
          <hr/>
        </div>
      )
    })
    return(
      <div>
        {chargeListItems}

      </div>
    )
  }
}

export default ChargeList;
