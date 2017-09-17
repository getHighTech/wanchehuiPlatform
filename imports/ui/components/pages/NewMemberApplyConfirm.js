'use strict';

import React from "react";

import { connect } from 'react-redux';

class NewMemberApplyConfirm extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div style={{padding: "20px"}}>
        <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
        <br/><br/>
        <h2>确认以下信息</h2>
        </div>
     </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(NewMemberApplyConfirm);
