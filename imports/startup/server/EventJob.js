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
    //   isBasic,
    // }

  }
  execute(eventName, userParams, callback){
    let job = EventJobs.findOne(eventName);
    if (job.isBasic) {
      try {
        return basicEvents[eventName](userParams);
      } catch (err) {
        console.error(err);
      } finally {
        return false;
      }
    }
    if(!job){
      console.error("任务名称不存在");
      return false;
    }
    if (job.beforeEventName) {
      this.before(job.beforeEventName)
    }


  }
  before(eventName){

  }
  after(eventName, callback){

  }
  positive(eventName, callback){

  }
  nagitive(eventName, callback){

  }
}

export default EventJob;
