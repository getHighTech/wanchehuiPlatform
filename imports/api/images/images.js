var imageStore = new FS.Store.GridFS('images', {
  mongoUrl: "mongodb://simontaosim:7686043104xsq@45.77.20.138:27017/wanchehui"
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
