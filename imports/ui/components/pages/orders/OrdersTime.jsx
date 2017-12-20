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
    local:"无",
    localarea:'全国'
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
    this.setState({
      startDate:startValue
    })
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
    let newDate = new Date(value._d);
    let endValue =newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
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
    let newcondition={}
    if (self.state.area !== ""){
      newcondition ={createdAt: {'$gt':new Date(this.state.startDate),'$lte':new Date(this.state.endDate)},status:self.props.SearchCondition.status,area:self.state.area};
    }else {
     newcondition ={createdAt: {'$gt':new Date(this.state.startDate),'$lte':new Date(this.state.endDate)},status:self.props.SearchCondition.status};

    }
    self.getData(newcondition);
    self.setState({
      local:"无",
      localarea:"全国"
    })
  }
  getData(newcondition){
    let self = this;
    Meteor.call('get.orders.InThisTime',newcondition,function(err,rlt){
      if(!err){
        self.props.getDateSearchData(rlt);
        self.props.getChangeCondition(newcondition)
      }
    })

    Meteor.call('get.orders.InThisTimeCount',newcondition,function(err,rlt){
      if(!err){
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
      localarea:"全国"
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
      localarea:"全国"
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
      localarea:"全国"
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
      localarea:"全国"
    })
  }

  DateEmpty(){
    let self =this;
    let newcondition={status:self.props.SearchCondition.status};
    self.getData(newcondition);
    self.setState({
      local:"无",
      startDate:null,
      endDate:null,
      startValue: null,
      endValue: null,
      localarea:"全国"
    })
  }
  getChengdu(){
    let self =this ;
    let area="area";
    let createdAt="createdAt";
    let newcondition =self.props.SearchCondition;
    newcondition[area]="CHENGDU";
    self.getData(newcondition);
    self.setState({
      localarea:"成都"
    })
    if(!newcondition[createdAt]){
      self.setState({
        startDate:null,
        endDate:null,
        startValue: null,
        endValue: null,
      })
    }
  }
  getBeiJing(){
    let self =this ;
    let area="area";
    let createdAt="createdAt";
    let newcondition =self.props.SearchCondition;
    newcondition[area]="BEIJING";
    self.getData(newcondition);
    self.setState({
      localarea:"北京"
    })
    if(!newcondition[createdAt]){
      self.setState({
        startDate:null,
        endDate:null,
        startValue: null,
        endValue: null,
      })
    }
  }
  getQuanGuo(){
    let self =this ;
    let area="area";
    let createdAt="createdAt";
    let newcondition =self.props.SearchCondition;
    delete newcondition.area;
    self.getData(newcondition);
    self.setState({
      localarea:"全国"
    })
    if(!newcondition[createdAt]){
      self.setState({
        startDate:null,
        endDate:null,
        startValue: null,
        endValue: null,
      })
    }
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
    <div style={{margin:'20px 10px 0px 0px'}}>
    <span>区域筛选：</span>
    <Button type="primary"  onClick={()=> this.getQuanGuo()} style={{margin:'0px 10px 0px 10px'}} value="全国">全国</Button>
    <Button type="primary"  onClick={()=> this.getBeiJing()} value='北京'>北京</Button>
    <Button type="primary"  onClick={()=> this.getChengdu()} style={{margin:'0px 25px 0px 10px'}}　value='成都'>成都</Button>
    <span>当前查询区域：{this.state.localarea}</span>
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
