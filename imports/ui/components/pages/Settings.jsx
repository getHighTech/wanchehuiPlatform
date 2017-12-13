'use strict';

import React from "react";

import { connect } from 'react-redux';
import { DatePicker } from 'antd';
// import setting from '/setting.css'

class Settings extends React.Component{
  constructor(props) {
    super(props);

  }

handleonChange (date,datestring){
  console.log(date,dateString);
}



  render() {
    return (
      <div><h1>系统设置</h1>开发中...
        <div>
          <DatePicker onChange={this.handleonChange} style={{width:'300px'}} getCalendarContainer={this.div}/>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Settings);
