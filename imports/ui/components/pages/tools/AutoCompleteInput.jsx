//此组件用于在高德地图中定位输入的文本的位置
import React, { Component } from 'react';

import AutoComplete from 'antd/lib/auto-complete/';
import 'antd/lib/auto-complete/style';


class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dataSource: [],
     };
  }

  componentDidMount(){

  }

  handleSearch = (value) => {
    this.props.getText(value);
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  onSelect(value) {

    console.log('onSelect', value);
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={this.onSelect.bind(this)}
        onSearch={this.handleSearch.bind(this)}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default AutoCompleteInput;
