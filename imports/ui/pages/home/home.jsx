import React, { Component } from 'react';
import Card from 'antd/lib/card/';
import Col from 'antd/lib/col/';
import Row from 'antd/lib/row/';
import 'antd/lib/card/style';
import 'antd/lib/col/style';
import 'antd/lib/row/style';
import { connect } from 'sia.js'


class Home extends Component {
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
        <Card title="车辆总数" bordered={false}>Card content</Card>
       <br/>
     </div>
    );
  }
}


export default Home
