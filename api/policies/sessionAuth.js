module.exports = function (req, res, next) {

  var token;
  if (req.method == "GET") {
    token = req.params['token'];
  } else {
    token = req.body.token;
  }
  if (token) {
    var responseObj = {};

  }


};
