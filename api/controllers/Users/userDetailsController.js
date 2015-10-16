/**
 * Users/userDetailsController
 *
 * @description :: Server-side logic for managing Users/userdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createUser: function (req, res) {

    var data = req.body.data;
    userDetails.add(data, function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  }
};

