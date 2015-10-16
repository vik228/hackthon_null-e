var redisUtils = require('../../customModules/RedisUtils.js');
module.exports = function (req, res, next) {

  var token;
  if (req.method == "GET") {
    token = req.params['token'];
  } else {
    token = req.body.token;
  }
  if (token) {
    var responseObj = {};
    redisUtils.getFromRedis()

  }


};
