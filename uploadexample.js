Uploads = new FS.Collection('uploads',{
stores:[new FS.Store.FileSystem('uploads',{path:'~/projectUploads'})]
});
if (Meteor.isClient) {
// counter starts at 0
Session.setDefault("counter", 0);

Template.hello.helpers({
counter: function () {
  return Session.get("counter");
},
uploads:function(){
  return Uploads.find();
}
});

Template.hello.events({
'change .fileInput':function(event,tmpl){
  FS.Utility.eachFile(event,function(file){
    var fileObj = new FS.File(file);
    Uploads.insert(fileObj),function(err){
      console.log(err);
    }
  })
}
});
}

if (Meteor.isServer) {
Meteor.startup(function () {
// code to run on server at startup
});
}
