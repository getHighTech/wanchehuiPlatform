// author: SimonXu xsqfeather@gmail.com
//这个obj参数包含了整个EventJob的数据结构,构造函数主要负责映射数据表，若是没有数据则要负责新建
// {
//   eventName,
//   userParams,
//   callback,
//   beforeEventName,
//   afterEventName,
//   positiveEventName,
//   nagitiveEventName,
// editable
//deletable
//   isBasic,//如果isBasic==true
// 那么有basicAction这个字段！
// }

import { Meteor } from 'meteor/meteor';
// Definition of the links collection

import { Mongo } from 'meteor/mongo';

const EventJobs = new Mongo.Collection('event_jobs');


class EventJob {
  constructor(obj,callback){
    if (!obj) {
      delete this;
      return null;
    }
    if (!obj.eventName) {
      delete this;
      return null;
    }

    let job = EventJobs.findOne({username: obj.eventName});
    if (job) {
      initJob(job);
    }else{
      let newObj = obj;
      newObj.createdAt = new Date();
      let job_new_id = EventJobs.insert(newObj);
      newObj = EventJobs.findOne({_id: job_new_id});
      this.initJob(newObj);
    }
    this.callback = callback;



  }

  initJob(job){
    this.id = job._id
    this.eventName = job.eventName;
    this.userParams = job.userParams;
    this.beforeEventName = job.beforeEventName;
    this.afterEventName = job.afterEventName;
    this.positiveEventName = job.positiveEventName;
    this.nagitiveEventName = job.nagitiveEventName;
    this.isBasic = job.isBasic;
    this.basicAction = job.basicAction;
    this.editable = job.editable;
    this.deletable = job.deletable;
  }
  execute(eventName, userParams){
    let job = EventJobs.findOne({username: ob.eventName});

    if(!job){
      console.error("任务名称不存在");
      this.destory();//释放这个实例的内存
      return false;
    }
    intitJob(job);

    if (job.beforeEventName) {
      this.before()
    }
    if (job.isBasic) {
      try {
        //执行basicAction,
        eval('let basicAction='+job.basicAction);
          //userParams.lastReturnParam这个对象是一个收集器，总是收集上一个执行的返回
        this.userParams.lastReturnParam = basicAction(userParams);
      } catch (err) {
        console.error(err);
      } finally {
        return false;
      }
    }
    if (job.afterEventName) {
      this.after();
    }
    return this.callback(eventName, userParams);

  }

  before(){
    this.execute(this.beforeEventName, this.userParams);
  }
  after(){
    this.execute(this.afterEventName, this.userParams);
  }
  positive(){
    this.execute(this.positiveEventName, this.userParams);

  }
  nagitive(){
    this.execute(this.nagitiveEventName, this.userParams);
  }
  destory(){
    if (this.id) {
      EventJobs.remove({_id: this.id})
    }
    delete this;
    return
  }
}

export default EventJob;
