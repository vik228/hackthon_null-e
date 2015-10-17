module.exports = function (req, res, next) {

  var token;
  console.log(req.body);
  if (req.method == "GET") {
    console.log(req.param('token'));
    token = req.param('token');
  } else {
    token = req.body.token;
  }
  if (token) {
    var responseObj = {};
    sails.config.getFromRedis(sails.config.user_creds, token, function (err, data) {
      if (err) {
        res.status(500);
        responseObj['responseCode'] = 500;
        responseObj['message'] = "Internal Server Error";
        return res.json({response: responseObj});
      } else if (data) {
        data = JSON.parse(data);
        console.log(data['uuid']);
        var refreshToken = data['token'];
        JwtToken.verify(refreshToken, data['uuid'], function (err, token) {
          if (err) {
            console.log(err);
            res.status(401);
            responseObj['responseCode'] = 401;
            responseObj['message'] = "token expired";
            return res.json({response: responseObj});
          } else {
            return next();
          }

        });
      } else {
        res.status(401);
        return res.json({
          response: {
            responseCode: 401,
            message: "Session Expired.operation not permitted"
          }
        });
      }
    });

  } else {
    res.status(400);
    return res.json({
      response: {
        responseCode: 400,
        message: "Token not found.."
      }
    });
  }


}
;
