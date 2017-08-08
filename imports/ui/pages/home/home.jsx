import React, { Component } from 'react';
import Card from 'antd/lib/card/';
import Col from 'antd/lib/col/';
import Row from 'antd/lib/row/';
import 'antd/lib/card/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';
import { connect } from 'sia.js'


class Home extends Component {
  constructor(props){
    super(props);

    let self = this;
    self.state　= {
      allUserCount: 0
    }
    Meteor.call("user.count.all", function(error, result){
      console.log(result);
      self.setState({
        allUserCount: result
      })
    })
  }
  componentDidMount(){

  }

  render() {

    return (
      <div style={{background: 'rgb(236, 236, 236)',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
        <Card title="用户总数" bordered={false}>{this.state.allUserCount}</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
        <Card title="车辆总数" bordered={false}>Card content</Card>
       <br/>
     </div>
    );
  }
}


export default Home
