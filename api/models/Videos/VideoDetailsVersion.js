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
    videoId: {
    	model: 'videos',
    	via: 'video_id',
    	required: true
    },
    userId: {
    	model: 'userDetails',
    	via: 'user_id',
    	required: true
    },
    parentId: {
    	type: 'integer',
      required: true
    },
    timestamp: {
      type: 'TIMESTAMP'
    }

  },
  validationMessages: {
    videoId: {
      required: 'video id is required'
    },
    userId: {
      required: 'UserId is required'
    }
  },
  add: function (video_details_version, callback) {

    videos.create(video_details_version, function (err, addedDetailsVersion) {

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
