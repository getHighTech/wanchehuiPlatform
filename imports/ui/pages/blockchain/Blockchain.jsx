import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
const { Header, Content, Footer, Sider } = Layout;
import Card from 'antd/lib/card/';
import Col from 'antd/lib/col/';
import Row from 'antd/lib/row/';
import 'antd/lib/card/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';
import { Tracker } from 'meteor/tracker'
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
        wallet: {
          confirmedsiacoinbalance:"0",
          encrypted:false,
          rescanning:false,
          siacoinclaimbalance:"0",
          siafundbalance:"0",
          unconfirmedincomingsiacoins:"0",
          unconfirmedoutgoingsiacoins:"0",
          unlocked:false,
        }
      }
    }

      Meteor.call('blockchain.check', function(error, result){
        if (result!= undefined) {
          self.setState({
            consensus: {
              synced: result.synced,
              currentblock: result.currentblock,
              height: result.height
            }
          });
        }

      });
      Meteor.call('blockchain.getVersion', function(error, result){
        if (result!= undefined) {
          self.setState({
            SiaVersion: result.version
          });
        }

      })
      Meteor.call('blockchain.getWallet', function(error, result){
        if (result!= undefined) {
          self.setState({
            wallet: result
          });
        }

      })




  }

  render() {
    console.log(this.state)
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
          <Card title="账户：">
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
          </Card>

        </div>
    </Content>
    )

  }
}

export default Blockchain;
