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
    },
    contact: {
      required: 'Contact is required'
    }
  },
  add: function (users, callback) {
    console.log(users);
    userDetails.create(users, function (err, addedUser) {
      var resposne = {};
      if (err) {
        console.log(err);
        resposne = sails.config.getResponseObject(userDetails, err, 400, null);
      } else {
        resposne = sails.config.getResponseObject(userDetails, null, 200, "user added");
        var userLoginDetails = {};
        userLoginDetails['login_id'] = addedUser['contact'];
        userLoginDetails['passwd'] = users['passwd'];
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

  },
  getUser: function (user_id, callback) {
    userDetails.findOne({contact: user_id}).exec(function (err, user) {
      var response = {};
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }

    });
  },
  getShareVideos: function (options, callback) {
    var query = userDetails.findOne({id: options['user_id']}).populate(options['data_to_populate']);
    options['page'] && query.paginate({'page': options['page'], 'limit': 10});
    query.exec(function (err, sentVideos) {
      var response = {};
      if (err) {
        response = sails.config.getResponseObject(userDetails, null, 500, "Internal Server Error");
        callback(response);

      } else {
        console.log(sentVideos);
        var allSentVideos = sentVideos[options['data_to_populate']];
        var whereObj = [];
        allSentVideos.forEach(function (sentVideo) {
          whereObj.push({id: sentVideo['shared_videos']});
        });
        console.log(whereObj);
        var allVideosQuery = VideoDetailsVersion.find(whereObj).populate('baseVideo').populate('owner');
        options['page'] && allVideosQuery.paginate({'page': options['page'], 'limit': 10});

        allVideosQuery.exec(function (err, videosDetails) {

          if (err) {
            response = sails.config.getResponseObject(userDetails, null, 500, "Internal Server Error");
          } else {
            response = sails.config.getResponseObject(userDetails, null, 200, videosDetails);

          }
          callback(response);
        });
      }


    });
  }
};

