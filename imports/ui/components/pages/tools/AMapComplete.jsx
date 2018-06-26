import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import { getShopAddress, getShopPoint } from '/imports/ui/actions/shops.js';
import { Roles } from '/imports/api/roles/roles.js';



class AMapComplete extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: "滴滴车主俱乐部",
        mapCenter: [104.115262,30.593927],
        value:this.props.singleShop.address,
        map:{}
      }
    }

    getInitialState(){
      return {value: this.props.initialValue};
    }

    handleChange(event){
      const { dispatch } = this.props;
      console.log(event.target.value)
      dispatch(getShopAddress(event.target.value))
    }

    inputOnBlur(v){
      let self = this;
      let inputValue = v.target.value
      const { dispatch } = self.props;
      AMap.plugin('AMap.PlaceSearch',function(){
        let placeSearch = new AMap.PlaceSearch({
          city:'成都',
          map:self.state.map
        })
        placeSearch.search(inputValue,function(status,result){
          if(result.poiList === undefined){
            alert("地址未找到，请输入正确的地址")
          }else{
            console.log(result.poiList.pois[0])
            dispatch(getShopAddress(inputValue))
            let point  = [result.poiList.pois[0].location.lng,result.poiList.pois[0].location.lat]
            dispatch(getShopPoint(point))
          }
        })
      })
    }

    initAmap(){

      let map = new AMap.Map("AMapContainer", {
        mapCenter: [104.115262, 30.593927],
        zoom: 15,//地图显示的缩放级别
      })
      this.setState({
        map: map
      }) 
    }   

    componentDidMount(){
      this.initAmap()
    }

    render(){
        return (
            <div>
                <Input type="text" id="input" autoComplete="off" value={this.props.shopAddress} disabled={this.props.editState}  style={{ width: '100%' }} onPressEnter= {  v => this.inputOnBlur(v) } onBlur={ v => this.inputOnBlur(v)}  onChange={e => this.handleChange(e)}/>
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
