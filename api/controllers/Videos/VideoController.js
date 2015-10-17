/**
 * Videos/VideoController
 *
 * @description :: Server-side logic for managing videos/videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createVideo: function (req, res) {

    var data = req.body.data;
    Video.add(data, function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  }
	
};

