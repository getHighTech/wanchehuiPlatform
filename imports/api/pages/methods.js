// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { PageContents } from './page_contents.js';
import { Pages } from './pages.js';


Meteor.methods({
  'get.page_content'(contentIndexName) {

  	return  PageContents.findOne(contentIndexName);

  },
  'update.page_content.locationIndex'(id, index){
    return PageContents.update(id, {$set:{
      locationIndex: index
    }});

  },
  'pages.insert'(title, indexName, author){
    if (Pages.find({title: title}).count() > 0) {
      return -1;
    }
    if (Pages.find({indexName: indexName}).count()>0) {
      return -2;
    }
    return Pages.insert({
      title,
      indexName,
      author,
      createdAt: new Date(),
      updatedAt: new Date()

    });
  },
  'pages.update.title'(id, title){
    if (Pages.find({title: title}).count() > 1) {
      return -1;
    }
    return Pages.update(id, {
      $set: {
        title,
        updatedAt: new Date(),
      }
    })
  },
  'page_content.carousel.update.images'(id, images){
    return PageContents.update(id, {
      $set: {
        images: images
      }
    });
  },
  'copy.sample.create'(pageid, sampleContentIndexName, locationIndex){

    let sample = PageContents.findOne({contentIndexName: "sample_"+sampleContentIndexName});
    let date = new Date();
    sample.contentIndexName = sampleContentIndexName+"_copy"+Date.parse(date.toString());
    sample.pageId = pageid;
    sample.locationIndex = locationIndex;
    delete sample._id;
    return PageContents.insert(sample);
  },
  'page_contents.remove'(id){
    return PageContents.remove(id);
  },
  'pages.delete'(id){
    return Pages.remove(id);
  }
});
