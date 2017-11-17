//此组件用于在高德地图中定位输入的文本的位置
import React, { Component } from 'react';

import AutoComplete from 'antd/lib/auto-complete/';
import 'antd/lib/auto-complete/style';


const Option = AutoComplete.Option;


class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dataSource: [],
       isSelected: false,
       defaultVal: ''
     };
  }

  componentDidMount(){
    let self = this;
    console.log(self.props);

  }

  handleSearch = (value) => {
    this.props.getText(value);
    // $('.amap-searcher input').val(self.props.fdata[0].name);
  }



  onSelect(value, option) {
    this.props.getResultText(value, option.props.index);
    this.setState({
      isSelected: true,
    })
  }



  render() {

    const children = this.props.fdata.map((item, index) => {
      return (<Option key={index} value={item.cityname+item.adname+item.address+item.name}>
        <div  style={{fontSize: "medium"}}>{item.name}</div>
        <div style={{fontSize: "small", fontStyle: "italic"}}>{item.address}</div>
      </Option>);
    });
    let self = this;
  let getDefaultValue = function(){
    if (children.length > 0) {
      let item = self.props.fdata[0];

      return item.cityname+item.adname+item.address+item.name;
    }else{
      return ""
    }
  }

    return (

      <AutoComplete
        defaultValue={getDefaultValue()}
        optionLabelProp="value"
        style={{ width: 200 }}
        onSelect={this.onSelect.bind(this)}
        onSearch={this.handleSearch.bind(this)}
        placeholder={this.props.placeholder}
        style={{width: "100%"}}
        className="amap-searcher"
      >
      {children}
      </AutoComplete>
    );
  }
}

export default AutoCompleteInput;
