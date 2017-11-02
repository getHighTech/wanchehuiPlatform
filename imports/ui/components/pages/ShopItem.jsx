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


import AddModal from './shops_components/AddModal.jsx';
import CommonForm from './shops_components/CommonForm.jsx'

class ShopItem extends React.Component{
  constructor(props) {
    super(props);

  }

  handleSearchInput(value){

    console.log(value);
  }





  render() {



    return (
        <CommonForm />


    )
  }
}
function mapStateToProps(state) {
  return {
      ShopForm: state.ShopForm,
   };
}

export default  connect(mapStateToProps)(ShopItem);
