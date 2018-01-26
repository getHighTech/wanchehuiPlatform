'use strict';

import React from "react";

import { connect } from 'react-redux';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';

import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";

import Button from 'antd/lib/button';
import "antd/lib/button/style";

import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

class ShopDashBoard extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
    }
  }

  
  


  render() {



    return (
      <div>
        单店DashBoard，开发中，敬请期待。。。
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(ShopDashBoard);
