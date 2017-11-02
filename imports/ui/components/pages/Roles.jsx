'use strict';

import React from "react";
import { connect } from 'react-redux';


class Roles extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div>这是角色管理页面,开发中。。。</div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Roles);
