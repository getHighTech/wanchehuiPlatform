var imageStore = new FS.Store.GridFS('images', {
  mongoUrl: "mongodb://wanchehui:wanchehui112358!%40#@120.27.22.78:27017/wanchehui"
});
let images = new FS.Collection('images', {
 stores: [imageStore]
});

images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});

export const Images = images;
