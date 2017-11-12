'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { Roles } from '/imports/api/roles/roles.js';

import { ShopColumns } from '../table_columns/ShopColumns.js'


import CommonModal from './shops_components/CommonModal.jsx';
import CommonForm from './shops_components/CommonForm.jsx'

class ShopItem extends React.Component{
  constructor(props) {
    super(props);

  }

  getShopInfo (shopInfo){
    Meteor.call("shops.insert", shopInfo, (error, result)=>{
      console.log(error)
      if (!error) {
        console.log('++++++++++++++++++++++++++++')
      }  
    });
  }
  componentDidMount(){
    //如果存在ID，说明是编辑
    if (this.props.params.id){
      this.getShop()
    }
  }
  getShop(){

  }
  render() {



    return (
        <CommonForm shopInfo={shopInfo => this.getShopInfo(shopInfo)}/>
      
        
    )
  }
}
function mapStateToProps(state) {
  return {
      ShopForm: state.ShopForm,
   };
}

export default  connect(mapStateToProps)(ShopItem);
