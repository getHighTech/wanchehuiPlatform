import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
const { Header, Content, Footer, Sider } = Layout;
import Card from 'antd/lib/card/';
import Col from 'antd/lib/col/';
import Row from 'antd/lib/row/';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style';
import 'antd/lib/card/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';
import { Tracker } from 'meteor/tracker';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'


// App component - represents the whole app
class Blockchain extends Component {
  constructor(props){
    super(props);
    let self = this;
    self.state = {
      consensus: {
        synced: '',
        currentblock: '',
        height: 0,

      },
      wallet: {
        confirmedsiacoinbalance:"0",
        encrypted:false,
        rescanning:false,
        siacoinclaimbalance:"0",
        siafundbalance:"0",
        unconfirmedincomingsiacoins:"0",
        unconfirmedoutgoingsiacoins:"0",
        unlocked:false,
        locking: false
      },
      walletAddress: ''
    }

    this.checkBlock();
    this.getBlockVersion();
    this.getWallet();
    // this.initSeed();
    this.seeSeeds();
    this.getWalletAddresses();







  }

  checkBlock(){
    let self = this;
    Meteor.call('blockchain.check', function(error, result){
      console.log(result);
      if (result!= undefined) {
        self.setState({
          consensus: {
            synced: result.data.synced,
            currentblock: result.data.currentblock,
            height: result.data.height
          }
        });
      }
      self.getWallet();
    });
  }

  seeSeeds(){
    let self = this;
    Meteor.call('blockchain.seeds', function(error, result){
      console.log(error);
      console.log(result);

    });
  }

  getWallet(){
    let self = this;
    Meteor.call('blockchain.getWallet', function(error, result){
      console.log(result);
      if (result!= undefined) {
        self.setState({
          wallet: {
            confirmedsiacoinbalance: result.data.confirmedsiacoinbalance,
            encrypted:result.data.encrypted,
            rescanning:result.data.rescanning,
            siacoinclaimbalance:result.data.siacoinclaimbalance,
            siafundbalance:result.data.siafundbalance,
            unconfirmedincomingsiacoins:"0",
            unconfirmedoutgoingsiacoins:"0",
            unlocked:result.data.unlocked,
            locking: false
          }
        });
      }

    });
  }

  getBlockVersion(){
    let self = this;
    Meteor.call('blockchain.getVersion', function(error, result){
      console.log(result);
      if (result!= undefined) {
        self.setState({
          SiaVersion: result.version
        });
      }

    });
  }

  getWalletAddresses(){
    let self = this;
    Meteor.call('blockchain.getAddresses', function(error, result){
      console.log(error);
      console.log(result);
      // if (result!= undefined) {
      //   self.setState({
      //     walletAddress: result.version
      //   });
      // }

    });
  }
  unlockWallet(){
    let self = this;
    Meteor.call('blockchain.wallet.unlock', function(error, result){
      console.log(error);
      console.log(result);
      self.dealWithWalletMessage(result.response.data);


    });
  }

  initSeed(){
    let self =  this;
    Meteor.call('blockchain.init.seed', function(error, result){
      console.log(error);
      console.log(result);
      self.getWallet();

    })
  }
  initWallet(){
    let self =  this;
    Meteor.call('blockchain.wallet.init', function(error, result){
      console.log(error);
      console.log(result);
      self.getWallet();
    });
  }

  dealWithWalletMessage(msg){
    console.log(msg.message);
    if (msg.message == "error when calling /wallet/unlock: wallet has not been encrypted yet") {
      console.log('need to seed');
      this.initWallet();
    }
    if (msg.message == "error when calling /wallet/unlock: provided encryption key is incorrect") {
      console.log('使用其他秘钥');
      this.initSeed();
    }
    if (msg.message == "error when calling /wallet/unlock: wallet has already been unlocked") {
      console.log('已经激活');
      this.getWallet();
    }
  }

  toggleWallet(checked){
    let self = this;

    if (checked) {


      this.unlockWallet();
    }else{
      this.setState({
        wallet: {
          unlocked : false,
          locking: false
        }
      });
    }


  }

  render() {

    let synced = function(syn){
      if (syn) {
        return(
            <h3>已经全部同步</h3>
        )
      }else{
        return(
            <h3>正在同步</h3>
        )
      }
    }
    let locked = function(unlocked){
      if (unlocked) {
        return(
            <h3>状态：已经激活</h3>
        )
      }else{
        return(
            <h3>状态：未激活</h3>
        )
      }
    };
    let locking = function(islocking, unlocked){
      if (islocking) {
        return (
            <h3>状态：正在激活</h3>
        )
      }else{
        return locked(unlocked);
      }
    }
    return(
      <Content style={{ margin: '10px 16px 0' }}>
        <h3>版本：细亚网络{this.state.SiaVersion}</h3><br/>
        <div style={{background: 'rgb(236, 236, 236)', position: 'relative', left: "-40px",
              padding: '5px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center' }}>

          <Card title="状态：">
              {synced(this.state.consensus.synced)}<br/>
              <h3>当前区块为：{this.state.consensus.currentblock}</h3><br/>
              <h3>区块高度为：{this.state.consensus.height}</h3>
              <p></p>
          </Card>
          <Card title="账户：" extra={<div href="#">激活<Switch defaultChecked={this.state.wallet.unlocked} checked={this.state.wallet.unlocked} onChange={this.toggleWallet.bind(this)}/></div>} >
            {locking(this.state.wallet.locking, this.state.wallet.unlocked)}<br/>
            <h3>余额：{this.state.wallet.confirmedsiacoinbalance}&nbsp;SCS</h3><br/>
            <p></p>
          </Card>

          <Card title="文件：" extra={<Link to="/">进入文件管理</Link>} >
            <h3>共耗资</h3>
            <h3>文件量</h3>
          </Card>

        </div>
    </Content>
    )

  }
}

export default Blockchain;
