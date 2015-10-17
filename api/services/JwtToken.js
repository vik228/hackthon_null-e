var nJwt = require('nJwt');
var uuid = require('node-uuid');
var hashAlgorithm = "HS512";
module.exports = {
  issue: function (claim, tokenSecret) {
    var jwt = nJwt.create(claim, tokenSecret, hashAlgorithm);
    jwt.setExpiration(new Date().getTime() + 60 * 60 * 10000);
    return jwt.compact();

  },
  verify: function (token, tokenSecret, callback) {
    console.log(tokenSecret);
    nJwt.verify(token, tokenSecret, hashAlgorithm, function (err, verifiedJwt) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, verifiedJwt);
      }

    });
  },
  increaseTime: function (token, tokenSecret, offset, callback) {
    nJwt.verify(token, tokenSecret, hashAlgorithm, function (err, verifiedJWT) {
      var expTime = verifiedJWT.body.exp;
      var newTime = expTime + offset;
      verifiedJWT.setExpiration(newTime * 1000);
    });
  }

}
