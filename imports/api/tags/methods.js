import { Meteor } from 'meteor/meteor';
import { Tags } from './tags.js'

Meteor.methods({
  "get.tag.id"(id){
    return Tags.findOne({_id: id});
  }
})
