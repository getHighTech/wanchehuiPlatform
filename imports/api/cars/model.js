import { Cars } from './cars.js';

class CarModel {

  constructor(carProtype, carNumber, carBelonged, engine, carFrame, drivingLicense, insurance, examinedTime) {
    this.carProtype  = carProtype;
    this.carNumber = carNumber;
    this.carBelonged = carBelonged;
    this.engine = engine;
    this.carFrame = carFrame;
    this.drivingLicense = drivingLicense;
    this.insurance = insurance;
    this.examinedTime = examinedTime;
  }

  insert(){
    let id = Cars.insert({
      carProtype: this.carProtype,
      carNumber: this.carNumber,
      carBelonged: this.carBelonged,
      engine: this.engine,
      carFrame: this.carFrame,
      drivingLicense: this.drivingLicense,
      insurance: this.insurance,
      examinedTime: this.examinedTime,
      createdAt: new Date()
    });
    this.id = id;
    return id;

  }
  destroy(){
    let count = Cars.remove({_id: this.id});
    return count;
  }

  static one(condition){
    return Cars.findOne(contditon);
  }

  static limit(condition, page, pagesize, sortby){
      return Cars.find(condition,
      {skip:page*pagesize, limit: pagesize, sort: sortby});
  }

  update(set){
    let count = Cars.update(this.id, {
      $set: {
        set
      }
    });
    let car = Cars.findOne({_id: this.id});
    return car;
  }

}

export default CarModel;
