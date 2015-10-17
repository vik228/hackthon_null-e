/**
 * Videos/videosController
 *
 * @description :: Server-side logic for managing Videos/videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addVideo: function (req, res) {
    var data = req.body.data;
    videos.addVideo(data, function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  },
  updateVideo: function (req, res) {
    var data = req.body.data;

    videos.updateVideo(data, function (responseObj) {
      res.status(responseObj['responseCode']);
      res.json({response: responseObj});
    })
  }

};

