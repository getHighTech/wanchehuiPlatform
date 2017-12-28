import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import { getShopAddress } from '/imports/ui/actions/shops.js';
import { Roles } from '/imports/api/roles/roles.js';



class AMapComplete extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: "滴滴车主俱乐部",
        mapCenter: [104.115262,30.593927],
        value:''
      }
    }

    getInitialState(){
      return {value: this.props.initialValue};
    }
    handleChange(event){
      this.setState({value: event.target.value});
      console.log("11")
    }
    initAmap(){
    //初始化地图
        let self = this;
        return map = new AMap.Map("AMapContainer", {
                zoom:15,
                center: self.state.mapCenter,
            });
    }   

    drawMap(city, inputId){
        let self = this
        this.initAmap()
        console.log(map)
        AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
          var autoOptions = {
            city: "成都", //城市，默认全国
            input: "input"//使用联想输入的input的id
          };
          autocomplete= new AMap.Autocomplete(autoOptions);
          var placeSearch = new AMap.PlaceSearch({
                city:'成都',
                map:map
          })
          AMap.event.addListener(autocomplete, "select", function(e){
            const {dispatch } = self.props;
             //TODO 针对选中的poi实现自己的功能
             placeSearch.setCity(e.poi.adcode);
             console.log(e.poi.adcode)
             placeSearch.search(e.poi.name)
             console.log("33333")
             dispatch(getShopAddress(e.poi.name))
             console.log(self.props.allState)
          });
        });
    }
    
    componentDidMount(){
        this.initAmap()
        this.drawMap();
    }


    render(){
        const {initialValue, editState,fieldsName, onChange,inputValue} = this.props
        return (
            <div>
                <Input type="text" id="input" defaultValue={this.props.inputValue} disabled={this.props.editState}  style={{ width: '100%' }} onChange={v => onChange(v)}/>
                {/* onChange={v => onChange({name:fieldsName,value:v.target.value})} */}
                <div id="AMapContainer" style={{height: "90%",minHeight:"230px", width: "100%"}}></div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      allState: state.ShopsList,
      singleShop: state.ShopsList.singleShop,
      modalState: state.ShopsList.modalInsert,    
      editState: !state.ShopsList.modalEditable,
      shopAddress: state.ShopsList.shopAddress
    };
  }
  
  export default createContainer(() => {
    if (Meteor.userId()) {
      Meteor.subscribe('roles.current');
    }
    return {
      current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
    };
  }, connect(mapStateToProps)(AMapComplete));
  