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
      required: true
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
      defaultsTo: 'inactive'
    },
    videos_sent: {
    	collection:'Transactions',
    	via:'sender_id'
    },
    videos_received: {
    	collection:'Transactions',
    	via:'receiver_id'
    },
    video_ids: {
    	collection: 'videos',
    	via: 'id'
    }
  },
  validationMessages: {
    fName: {
      required: 'First Name is required'
    },
    email: {
      email: 'Please enter a valid email',
      required: 'Email is required'
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

