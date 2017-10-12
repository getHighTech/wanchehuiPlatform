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

  componentDidMount(){

    //地图加载
    let map = this.initAmap();
    
     AMap.service(["AMap.PlaceSearch"], function() {
         var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
             pageSize: 5,
             pageIndex: 1,
             city: "010", //城市
             map: map,
             panel: "panel"
         });
         //关键字查询
         placeSearch.search('方恒', function(status, result) {
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
