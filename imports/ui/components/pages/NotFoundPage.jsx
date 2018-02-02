import React from "react";
import {connect} from 'react-redux'



class NotFoundPage extends React.Component{
  render(){
    return(
      <div>哦吼，页面找不到了！</div>
    )
  }
}
function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(NotFoundPage)