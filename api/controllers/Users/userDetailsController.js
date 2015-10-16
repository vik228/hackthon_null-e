/**
 * Users/userDetailsController
 *
 * @description :: Server-side logic for managing Users/userdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');

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
    console.log('there');
    fs.readFile(process.cwd() + "/assets/templates/emails/verification.html", "utf8", function(error, data) {
      var template = _.template(data);
      console.log("data: "+data+"\nerror: "+error);
      console.log(template({
        name: req.body.name,
        verification_url: 'http://localhost/user/verify?key=sdfsdfsd23423fds'
      }));
      var message = {
        "subject": "Please verify your email address",
        "from_email": "nule@housing.com",
        "from_name": "Nulle",
        "to":[
            {"email": req.body.email, "name": req.body.name}
        ],
        "html" : template({
          name: req.body.name,
          verification_url: 'http://localhost/user/verify?key=sdfsdfsd23423fds'
        })
      };

      EmailService.sendEmail(message, function(response){
        res.status(response.status);
        res.json(response);
      });

    });

  }

};

