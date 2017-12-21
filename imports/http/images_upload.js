var formidable = require('formidable'),
http = require('http'),
util = require('util');

  console.log('调用imagesUploads方法成功')
  http.createServer(function(req, res) {
    console.log(req.url)
    console.log(req.method)
    if (req.url == '/upload' && req.method.toLowerCase() == 'options' || req.method.toLowerCase() == 'post') {
      console.log('调用上传方法成功')
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "/tmp";
    form.parse(req, function(err, fields, files) {

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    
    return;
    }
    console.log('error')
    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    );
    }).listen(8080);
