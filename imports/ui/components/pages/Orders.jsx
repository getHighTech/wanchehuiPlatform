'use strict';

import React from "react";

import { connect } from 'react-redux';

class Orders extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div><h1>订单管理</h1>开发中....</div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Orders);
