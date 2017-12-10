//此组件用于分别显示各个用户的基本资料和情况
import React, { Component } from 'react';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';

import './UserBasicView.less';

import IncomeList from './IncomeList';
import ChargeList from './ChargeList';

const TabPane = Tabs.TabPane;
import {findBalanceByUsername} from '../../../services/balances'

class UserBasicView extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true,
      modalshow: false,
      totalIn: '',
      totalOut: '',
      balance: {

      }
    }
  }
  componentDidMount(){
    this.getData(this.props.username);
  }

  getIncomes(balanceId){

  }

  getCharges(balanceId){

  }

  getData(username){
    findBalanceByUsername(username, (err, rlt)=>{
      if (err) {
        console.error(err);
        return false;
      }
      if (typeof rlt !== 'object') {
        console.error(rlt);
        this.setState({
          loading: false,
          totalIn: '',
          totalOut: '',
          balance: {
            amount: 0,

          },
        });
        return false;
      }
      this.setState({
        loading: false,
        balance: rlt,
      });

    })
  }
  componentWillReceiveProps(nextProps){
    //目的在于每次打开都可以加载数据
    if (nextProps.loadState) {
      this.getData(this.props.username);
    }
  }
  handleTabChange(key){
    console.log(key);
  }
  handleCheckAllBtn(){
    let self = this;
    console.log('click effect');
    this.setState({
      loading: true,
    })
    Meteor.call("balances.userId.all", this.state.balance.userId, function(err, rlt){
      if (!err) {
        console.log(rlt);
        self.setState({
          loading: false,
          totalIn: rlt.totalIn,
          totalOut: rlt.totalOut,
          balance: rlt,
        })
      }
    });
  }
  render() {
    console.log(this.state);
    let balanceExist = (balanceAmount) => {
      if (balanceAmount && this.props.loadState) {
        return (
          <div>
          <div style={{textAlign: "center"}}>最近５笔收支:</div>

          <Tabs defaultActiveKey="1" onChange={this.handleTabChange.bind(this)}>
             <TabPane tab={"收入"+this.state.totalIn/100} key="1">
                  <IncomeList count={5} balanceId={this.state.balance._id} userId={this.state.balance.userId} data={this.state.balance.incomes} />
             </TabPane>

             <TabPane tab={"支出"+this.state.totalOut/100} key="2">
                  <ChargeList count={5} data={this.state.balance.charges} />
             </TabPane>
           </Tabs>
           <div style={{textAlign: "center"}}>
             <Button onClick={this.handleCheckAllBtn.bind(this)}  type="dashed">查看更多明细</Button>
           </div>

           </div>

        );
      }else{
        return (
          <div style={{textAlign: "center"}}>用户暂时没有钱包</div>
        )
      }

    }
    return (
      <div >
        <div>
          <Spin tip='加载中' spinning={this.state.loading}>
            <div style={{textAlign: "center"}}>余额：{(this.state.balance.amount)/100}元</div>

          </Spin>
          <Spin tip='明细加载中' spinning={this.state.loading}>
            {balanceExist(this.state.balance.amount)}
          </Spin>
        </div>

      </div>

    );
  }
}

export default UserBasicView;
