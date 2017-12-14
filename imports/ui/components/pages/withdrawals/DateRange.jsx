import DatePicker from 'antd/lib/date-picker';
import "antd/lib/date-picker/style";
import React from "react";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { Input } from 'antd';
import { Button } from 'antd';
import "antd/lib/button/style";
const Search = Input.Search;
const { RangePicker } = DatePicker;
import moment from 'moment';



class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
    console.log('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
    console.log('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>



        <div style={{padding:'20px',background: 'rgb(236, 236, 236)'}} className='div1'>
        <span>关键字：</span>


        <span style={{margin:'0px 0px 0px 20px'}}>时间筛选：</span>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />



        <span> - </span>
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />

        <Button type="primary" style={{margin:'0px 10px 0px 10px',background:'#434547'}}>搜索</Button>


      <div style={{margin:'20px 10px 0px 0px'}}>
        <span>区域筛选：</span>
        <Button type="primary"   style={{margin:'0px 10px 0px 10px'}} value="全国">全国</Button>
        <Button type="primary"  value='北京'>北京</Button>
        <Button type="primary"   style={{margin:'0px 25px 0px 10px'}}　value='成都'>成都</Button>
        <span>当前查询区域：{this.state.value}</span>
      </div>
      <div style={{margin:'20px 10px 0px 0px'}}>
        <span>时段筛选：</span>
        <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>今日</Button>
        <Button type="primary">昨日</Button>
        <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>最近７天</Button>
        <Button type="primary" >最近３０天</Button>
    </div>

    </div>




      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(DateRange);
