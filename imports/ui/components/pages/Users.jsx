'use strict';

import React from "react";
import { connect } from 'react-redux';


class Users extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div>这是用户管理界面</div>
    )
  }
}
function mapStateToProps(state) {
  return {
  
   };
}

export default connect(mapStateToProps)(Users);
