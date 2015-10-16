/**
* Videos/VideoDetailsVersion.js
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
    VideoId: {
    	model: 'Video',
    	via: 'video_id',
    	required: true
    },
    UserId: {
    	model: 'UserDetails',
    	via: 'user_id',
    	required: true
    },
    ParentId: {
    	type: 'integer'
    }

  },
  validationMessages: {
    VideoId: {
      required: 'video id is required'
    },
    UserId: {
      required: 'UserId is required'
    }
  },
  add: function (video_details_version, callback) {

    Video.create(video_details_version, function (err, addedDetailsVersion) {

      var response = {};
      if (err) {
        console.log(err);
        response = sails.config.getResponseObject(VideoDetailsVersion, err, 400, null);
      } else {
        response = sails.config.getResponseObject(VideoDetailsVersion, null, 200, "Video Details Version added");
      }
      callback(response);

    });

  }
};
