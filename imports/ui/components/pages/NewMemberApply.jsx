'use strict';

import React from "react";

import { connect } from 'react-redux';
import {Link} from 'react-router'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
class NewMemberApply extends React.Component{
  constructor(props) {
    super(props);

  }






  render() {
    return (
      <div>

        <div style={{padding: "20px"}}>
          <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
          <br/><br/>
            <h2>填下以下信息，申请入驻我们，我们会尽快联系您</h2><br/>
            <Editor />
          </div>

        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(NewMemberApply);
