'use strict';

import React from "react";

import { connect } from 'react-redux';

class PageTemp extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div>这是一个页面的基本机构，可以抄写</div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(PageTemp);
