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



class ordersTime extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    startDate:null,
    endDate:null,
    area:'',
    local:"无"
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
    let newDate = new Date(value._d);
    let startValue =newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    console.log(startValue);
    this.setState({
      startDate:startValue
    })
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
    let newDate = new Date(value._d);
    let endValue =newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    console.log(new Date(endValue));
    this.setState({
      endDate:endValue
    })
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  DateFind(){
    let self =this;
    console.log(self.props.SearchCondition.status);
    console.log(self.state.startDate,this.state.endDate);
    console.log(self.state.area)
    let newcondition={}
    if (self.state.area !== ""){
      console.log(self.state)
      newcondition ={createdAt: {'$gt':new Date(this.state.startDate),'$lte':new Date(this.state.endDate)},status:self.props.SearchCondition.status,area:self.state.area};
    }else {
     newcondition ={createdAt: {'$gt':new Date(this.state.startDate),'$lte':new Date(this.state.endDate)},status:self.props.SearchCondition.status};

    }
    self.getData(newcondition);
    self.setState({
      local:"无"
    })
  }
  getData(newcondition){
    let self = this;
    Meteor.call('get.orders.InThisTime',newcondition,function(err,rlt){
      if(!err){
        console.log(rlt);
        self.props.getDateSearchData(rlt);
        console.log(rlt);
        self.props.getChangeCondition(newcondition)
      }
    })

    Meteor.call('get.orders.InThisTimeCount',newcondition,function(err,rlt){
      if(!err){
        console.log(rlt);
        self.props.getDateSearchtotalCount(rlt);
      }
      else{
        console.log(error);
      }
    })
  }
  getToday(){
    let self =this;
    let currentDate = new Date();
    let newCurrentDate =currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate();
    let nextdate = (new Date((currentDate/1000+86400)*1000))
    let newNextDate =nextdate.getFullYear() + '/' + (nextdate.getMonth() + 1) + '/' + nextdate.getDate();
    let newcondition ={createdAt: {'$gt':new Date(newCurrentDate),'$lte':new Date(newNextDate)},status:self.props.SearchCondition.status};
    self.getData(newcondition);
    self.setState({
      local:"今日",
      startDate:null,
      endDate:null,
      startValue: null,
      endValue: null,
    })
  }
  getYesterday(){
    let self =this;
    let currentDate = new Date();
    let newCurrentDate =currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate();
    let yesterdate = (new Date((currentDate/1000-86400)*1000))
    let newyesterdate =yesterdate.getFullYear() + '/' + (yesterdate.getMonth() + 1) + '/' + yesterdate.getDate();
    let newcondition ={createdAt: {'$gt':new Date(newyesterdate),'$lte':new Date(newCurrentDate)},status:self.props.SearchCondition.status};
    self.getData(newcondition);
    self.setState({
      local:"昨日",
      startDate:null,
      endDate:null,
      startValue: null,
      endValue: null,
    })
  }
  getInthisWeek(){
    let self =this;
    let currentDate = new Date();
    let newCurrentDate =currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate();
    let yesterdate = (new Date((currentDate/1000-86400*7)*1000))
    let newyesterdate =yesterdate.getFullYear() + '/' + (yesterdate.getMonth() + 1) + '/' + yesterdate.getDate();
    let newcondition ={createdAt: {'$gt':new Date(newyesterdate),'$lte':new Date(newCurrentDate)},status:self.props.SearchCondition.status};
    self.getData(newcondition);
    self.setState({
      local:"最近7日",
      startDate:null,
      endDate:null,
      startValue: null,
      endValue: null,
    })
  }
  getInthisMonth(){
    let self =this;
    let currentDate = new Date();
    let newCurrentDate =currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate();
    let yesterdate = (new Date((currentDate/1000-86400*30)*1000))
    let newyesterdate =yesterdate.getFullYear() + '/' + (yesterdate.getMonth() + 1) + '/' + yesterdate.getDate();
    let newcondition ={createdAt: {'$gt':new Date(newyesterdate),'$lte':new Date(newCurrentDate)},status:self.props.SearchCondition.status};
    self.getData(newcondition);
    self.setState({
      local:"最近30日",
      startDate:null,
      endDate:null,
      startValue: null,
      endValue: null,
    })
  }

  DateEmpty(){
    let self =this;
    console.log(self.props.SearchCondition.status);
    let newcondition={status:self.props.SearchCondition.status};
    self.getData(newcondition);
    self.setState({
      local:"无"
    })
  }
  getChengdu(){
    let self =this ;
    self.setState({
      area:"CHENGDU"
    })
    console.log(self.props.SearchCondition.status);
    console.log(self.state.startDate,this.state.endDate);
    console.log(self.state.area)



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

        <Button type="primary" onClick={() => this.DateFind()} style={{margin:'0px 10px 0px 10px',background:'#434547'}}>搜索</Button>
        <Button type="primary" onClick={() => this.DateEmpty()} style={{margin:'0px 10px 0px 10px',background:'#434547'}}>清空</Button>


      <div style={{margin:'20px 10px 0px 0px'}}>
        <span>时段筛选：</span>
        <Button type="primary" onClick={()=> this.getToday()} style={{margin:'0px 10px 0px 10px'}}>今日</Button>
        <Button type="primary" onClick={()=> this.getYesterday()} >昨日</Button>
        <Button type="primary" onClick={()=> this.getInthisWeek()} style={{margin:'0px 10px 0px 10px'}}>最近７天</Button>
        <Button type="primary" onClick={()=> this.getInthisMonth()} >最近３０天</Button>
        <span style={{margin:'0px 10px 0px 10px'}}>当前筛选时段:{this.state.local}</span>
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

export default connect(mapStateToProps)(ordersTime);
