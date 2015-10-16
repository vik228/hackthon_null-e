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
  },

  //For testing
  sendEmail: function(req, res) {
  	response = EmailService.sendEmail(req.body, function(response){
      res.status(response.status);
      res.json(response);
    });
  }
};

