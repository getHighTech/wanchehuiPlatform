//此组件用于在高德地图中定位输入的文本的位置
import React, { Component } from 'react';


import AutoCompleteInput from './AutoCompleteInput.jsx';

class AMapSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "滴滴车主俱乐部",
      currentCityCode: "",
      currentCity: "",
      searchList: [],
      mapCenter: [104.115262,30.593927],
    }
  }

  initAmap(){
    //初始化地图
    let self = this;
    return map = new AMap.Map("AMapContainer", {
         zoom:15,
         center: self.state.mapCenter,
     });
  }


    getText(value){
      let self = this;
      console.log(value);
      this.setState({
        searchText: value
      });
      self.getKeywordSearch(value);

    }


  getCurrentPixFromIp(){
    let self = this;
    $.get("http://restapi.amap.com/v3/ip?&output=json&key=9626362743f2ab5b790165671929374f", function(data){
      self.setState({
        currentCity: data.city,
        currentCityCode: data.adcode,
      });
    })
  }

  getKeywordSearch(keyword){
    let self = this;
    $.get("http://restapi.amap.com/v3/place/text?&keywords="+keyword+"&city="+self.state.currentCityCode+"&output=json&offset=20&page=1&key=9626362743f2ab5b790165671929374f&extensions=all",
    function(data){
      let locationArr = []
      if (data.pois[0] != undefined) {
         locationArr = data.pois[0].location.split(',',2);
      }

      self.setState({
        searchList: data.pois,
        mapCenter: locationArr,
      });
    });
  }

  componentDidMount(){
    let self = this;

    //地图加载

    self.getCurrentPixFromIp();
  }

  getResultText(value, index){
    console.log(index);
    console.log(this.state.searchList[index]);
    let locationArr = [];
    if (this.state.searchList[index] != undefined) {
       locationArr = this.state.searchList[index].location.split(',',2);
       this.setState({
         mapCenter: locationArr,
       })
    }

  }




  render(){
    if (this.state.mapCenter.length >= 2) {
      let mapObj = this.initAmap();
    }
    return (
      <div>
        <AutoCompleteInput
        fdata={this.state.searchList}
        placeholder="请输入关键字查找地理位置"
        getText={(value)=> this.getText(value)}
        getResultText={(value, index) => this.getResultText(value, index)}
        />
        <div id="AMapContainer" style={{height: "90%",minHeight:"230px", width: "100%"}}>

        </div>
      </div>



    )
  }
}

export default AMapSearcher;
