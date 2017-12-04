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
<<<<<<< HEAD

        <CommonForm shopInfo={shopInfo => this.getShopInfo(shopInfo)}/>

=======
        <CommonForm shopInfo={shopInfo => this.getShopInfo(shopInfo)}/>
      
        
>>>>>>> 14dbb8a3b6943e39586b57a93e5a37da23b4fe6f
    )
  }
}
function mapStateToProps(state) {
  return {
      ShopForm: state.ShopForm,
   };
}

export default  connect(mapStateToProps)(ShopItem);
