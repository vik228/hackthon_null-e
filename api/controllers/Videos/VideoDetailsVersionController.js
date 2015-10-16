/**
 * Videos/VideoDetailsVersionController
 *
 * @description :: Server-side logic for managing videos/videodetailsversions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createDetailsVersion: function (req, res) {

    var data = req.body.data;
    VideoDetailsVersion.add(data, function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  }
	
};


