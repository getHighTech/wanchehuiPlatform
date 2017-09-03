'use strict';

import React from "react";

import { connect } from 'react-redux';

class DashBoard extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div>这是默认界面</div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(DashBoard);
