/**
 * Users/userDetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var uuid = require('node-uuid');
module.exports = {

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    fName: {
      type: 'string',
      required: true
    },
    lNmae: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    contact: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
      defaultsTo: 'inactive'
    },
    uploaded_videos: {
      collection: 'videos',
      via: 'user_id'
    },
    videos_sent: {
      collection: 'Transaction',
      via: 'sender_id'
    },
    videos_received: {
      collection: 'Transaction',
      via: 'receiver_id'
    },
    versions: {
      collection: 'VideoDetailsVersion',
      via: 'owner'
    }
  },
  validationMessages: {
    fName: {
      required: 'First Name is required'
    },
    email: {
      email: 'Please enter a valid email',
      required: 'Email is required',
      unique: 'User already exists'
    }
  },
  add: function (users, callback) {
    console.log(users);
    userDetails.create(users, function (err, addedUser) {
      var resposne = {};
      if (err) {
        resposne = sails.config.getResponseObject(userDetails, err, 400, null);
      } else {
        resposne = sails.config.getResponseObject(userDetails, null, 200, "user added");
        var userLoginDetails = {};
        userLoginDetails['login_id'] = addedUser[0]['email'];
        userLoginDetails['passwd'] = users[0]['passwd'];
        userLoginDetails['uuid'] = uuid.v4();
        login.create(userLoginDetails, function (err, users) {
          if (err) {
            console.log(err);
          } else {
            console.log(users);
          }
        });
      }
      callback(resposne);

    });

  }
};

