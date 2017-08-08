// All links-related publications

import { Meteor } from 'meteor/meteor';
import { PageContents } from '../page_contents.js';
import { Pages } from '../pages.js'

Meteor.publish('page_contents.all.by_id', function (pageId) {
  return PageContents.find({pageId: pageId});
});

Meteor.publish('pages.getone', function(indexName){
  return Pages.find(indexName);
});
Meteor.publish('pages.one', function(id){
  return Pages.find({_id: id});
});
Meteor.publish('pages.one.bytitle', function(title){
  return Pages.find({title: title});
});
Meteor.publish('pages.all', function(){
  return Pages.find();
})
