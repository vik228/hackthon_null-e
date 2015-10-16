/**
 * Users/loginController
 *
 * @description :: Server-side logic for managing users/logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  initLogin: function (req, res) {

    var data = req.body.data;
    login.initLogin(data, function (loginDetails) {

      res.status(loginDetails['responseCode']);
      res.json({reponse: loginDetails});

    });
  }

};

