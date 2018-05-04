//此组件用于测试
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

class OrderState extends Component {



 render() {

   return (
     <div>orderstate</div>
   );
 }



}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(OrderState);
