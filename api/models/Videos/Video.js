/**
* Videos/Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    link: {
    	type: 'string',
    	required: true,

    },
    desc: {
    	type: "string",

    },
    UserId: {
    	model: 'UserDetails',
    	via: 'user_id',
    	required: true
    },
    video_id: {
    	collection: 'VideoDetailsVersion',
    	via: 'VideoId'
    }
    
  },
  validationMessages: {
    link: {
      required: 'Link is required'
    },
    UserId: {
      required: 'UserId is required'
    }
  },
  add: function (video, callback) {

    Video.create(video, function (err, addedVideo) {

      var response = {};
      if (err) {
        console.log(err);
        response = sails.config.getResponseObject(Video, err, 400, null);
      } else {
        response = sails.config.getResponseObject(Video, null, 200, "user added");
      }
      callback(response);

    });

  }
};

