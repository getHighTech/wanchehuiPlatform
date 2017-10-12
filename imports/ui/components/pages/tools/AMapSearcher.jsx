//此组件用于在高德地图中定位输入的文本的位置
import React, { Component } from 'react';


class AMapSearcher extends Component {
  constructor(props) {
    super(props);
  }

  initAmap(){
    return map = new AMap.Map("AMapContainer", {
         resizeEnable: true
     });
  }
  showCityInfo(map) {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    console.log(cityinfo);
                    //地图显示当前城市
                    map.setBounds(citybounds);
                }
            } else {
                console.log(result);
            }
        });
    }

  componentDidMount(){

    //地图加载
    let mapObj = this.initAmap();
    mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
     AMap.service(["AMap.PlaceSearch"], function() {
         var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
             pageSize: 5,
             pageIndex: 1,
             city: "010", //城市
             map: mapObj,
             panel: "panel"
         });
         //关键字查询
         placeSearch.search('滴滴车主俱乐部', function(status, result) {
           console.log(result);
          });
     });
     window.onload = function() {
      map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
      });
      if(location.href.indexOf('&guide=1')!==-1){
        map.setStatus({scrollWheel:false})
      }
     }

  }



  render(){
    return (
      <div>
        <h1>这是高德自动检索定位组件</h1>
        <input type="text" />
        <div id="AMapContainer" style={{height: "600px", width: "600px"}}>

        </div>
      </div>



    )
  }
}

export default AMapSearcher;
