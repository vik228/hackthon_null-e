/**
 * Users/userDetailsController
 *
 * @description :: Server-side logic for managing Users/userdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createUser: function (req, res) {
    var data = req.body.data;
    console.log(data);
    userDetails.add(data, function (responseObj) {
      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  },
  getVideos: function (req, res) {
    var options = sails.config.getQueryString(req);
    userDetails.getShareVideos(options, function (responseObject) {
      res.status(responseObject['responseCode']);
      res.json({response: responseObject});
    });
  }
};

