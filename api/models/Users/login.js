/**
 * Users/login.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    login_id: {
      type: 'string',
      unique: true
    },
    passwd: {
      type: 'string',
      required: true
    },
    uuid: {
      type: 'string'
    }
  },
  hashPassword: function (user, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.passwd, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.passwd = hash;
        next();

      });

    });
  },
  beforeUpdate: function (user, next) {
    login.hashPassword(user, next);
  },
  beforeCreate: function (user, next) {
    login.hashPassword(user, next);
  },
  comparePassword: function (password, user, cb) {
    console.log("pass is " + password);
    bcrypt.compare(password, user.passwd, function (err, match) {
      console.log(match);
      if (err) {
        return cb(err);
      } else {
        cb(null, match);
      }
    });
  },
  initLogin: function (data, callback) {
    var loginId = data['login_id'];
    var passwd = data['passwd'];
    var resObj = {};
    if (!loginId || !passwd) {
      resObj = sails.config.Utils.getResponseObject(login, err, 400, "All fields are mandatory");
      callback(resObj);
    } else {
      login.findOne({login_id: loginId}).exec(function (err, user) {
        if (err) {
          resObj = sails.config.getResponseObject(login, err, 500, 'Internal Server Error');
          callback(resObj);
        } else if (!user) {
          resObj = sails.config.getResponseObject(login, null, 400, "User not found");
          callback(resObj);
        } else {
          login.comparePassword(user['passwd'], user, function (err, match) {

            if (!match) {
              resObj = sails.config.getResponseObject(login, null, 401, "Authentication Failed");

            } else {
              resObj = sailsi.config.getResponseObject(login, null, 200, "Authentication successful");
              var claim = {
                iss: 'hackthon_null-e',
                sub: user['login'],
                scope: 'god'
              }
              var token = JwtToken.issue(claim, user['uuid']);
              resObj['user_id'] = loginId;
              resObj['token'] = token;

              var userCache = {};
              userCache['token'] = token;
              userCache['uuid'] = user['uuid'];
              userCache['login_id'] = user['login_id'];
              sails.config.insertIntoRedis(sails.config.user_creds, token, userCache);
            }
            return (callback(resObj));

          });
        }

      });

    }
  }
};

