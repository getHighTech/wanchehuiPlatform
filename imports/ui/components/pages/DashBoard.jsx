'use strict';

import React from "react";

import { connect } from 'react-redux';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';
class DashBoard extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div style={{background: 'rgb(236, 236, 236)', position: 'relative', left: "-40px",
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
            <Card title="总共的注册量：">
              
            </Card>
            <Card title="总持卡人数:" >

            </Card>
            <Card title="今日新增注册量:" >

            </Card>
            <Card title="今日卡销量:" >

            </Card>
            <Card title="本周卡片销量:" >

            </Card>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(DashBoard);
