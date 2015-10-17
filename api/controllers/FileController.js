/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
var path = require('path');
module.exports = {


  upload: function (req, res) {

    res.setTimeout(0);
    req.file('avatar')
      .upload({
        dirname: '../../assets/uploads/',
        maxBytes: 1024 * 1024 * 1024
      }, function whenDone(err, uploadedFiles) {
        if (err) return res.serverError(err);
        else return res.json({
          files: uploadedFiles,
          textParams: req.params.all()
        });
        console.log(res);
      });
  },
  stream: function (req, res) {

    var range = req.headers.range;
    if (range) {
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var file = path.resolve(req.param('path'));
      fs.stat(file, function (err, stats) {

        var total = stats.size;
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunksize = (end - start) + 1;

        res.writeHead(206, {
          "Content-Range": "bytes " + start + "-" + end + "/" + total,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4"
        });
        var movieStream = fs.createReadStream(file, {start: start, end: end});
        movieStream.on('open', function () {
          movieStream.pipe(res);
        });

        movieStream.on('error', function (err) {
          res.end(err);
        });
      });
    } else {
      var file = path.resolve(req.param('path'));
      var stat = fs.statSync(file)
      res.writeHead(200, {'Content-Length': stat.size, 'Content-Type': 'video/mp4'});
      fs.createReadStream(file).pipe(res);
    }

  }
};
