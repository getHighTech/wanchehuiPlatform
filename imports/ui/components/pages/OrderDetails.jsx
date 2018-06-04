'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { Roles } from '/imports/api/roles/roles.js';


import CommonModal from './shops_components/CommonModal.jsx';
import CommonForm from './shops_components/CommonForm.jsx'

class OrderDetails extends React.Component{
  constructor(props) {
    super(props);

  }


  componentDidMount(){
    //如果存在ID，说明是编辑
    console.log(this.props.params._id);

  }

  render() {



    return (

      <div>订单id:{this.props.params._id}</div>



    )
  }
}
function mapStateToProps(state) {
  return {
      ShopForm: state.ShopForm,
   };
}

export default  connect(mapStateToProps)(OrderDetails);
