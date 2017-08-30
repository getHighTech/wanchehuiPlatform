import {basicEvents, basicEventsInfo} from "./basic_events.js"

import EventJobs from "./event_jobs.js";
class EventJob {
  constructor(obj,callback){
    //这个obj参数包含了整个EventJob的数据结构,构造函数主要负责映射数据表，若是没有数据则要负责新建
    // {
    //   eventName,
    //   userParams,
    //   callback,
    //   beforeEventName,
    //   afterEventName,
    //   positiveEventName,
    //   nagitiveEventName,
    //   isBasic,//如果isBasic==true
    // 那么有basicAction这个字段！
    // }

  }
  execute(eventName, userParams, callback){
    let job = EventJobs.findOne(eventName);
    this.eventName = eventName;
    let backVal = undefined;
    if(!job){
      console.error("任务名称不存在");
      return false;
    }

    if (job.beforeEventName) {
      this.before(job.beforeEventName, userParams)
    }
    if (job.isBasic) {
      try {
        //执行basicAction,
        eval('let basicAction='+job.basicAction);
        backVal = basicAction(userParams);
        return backVal;
      } catch (err) {
        console.error(err);
      } finally {
        return false;
      }
    }
    if (job.afterEventName) {
      this.after(job.aferEventName, userParams)
    }
    if (backVal === undefined) {
      return true;
    }
    if (backVal) {
      this.positive(job.positiveEventName, userParams)
    }
    if (!backVal) {
      this.nagitive(job.nagitiveEventName, userParams)
    }


  }
  before(eventName, userParams){
    this.execute(eventName, userParams);
  }
  after(eventName, userParams){
    this.execute(eventName, userParams);
  }
  positive(eventName, userParams){

  }
  nagitive(eventName, userParams){

  }
}

export default EventJob;
