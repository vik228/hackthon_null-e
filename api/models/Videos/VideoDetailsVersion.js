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
    baseVideo: {
      model: 'videos',
      via: 'versions',
      required: true
    },
    owner: {
      model: 'userDetails',
      via: 'versions',
      required: true
    },
    parentId: {
      type: 'integer',
      required: true
    },
    data: {
      type: 'json',
      required: true
    },
    all_shares: {
      collection: 'Transaction',
      via: 'shared_videos'
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

    VideoDetailsVersion.create(video_details_version, function (err, addedDetailsVersion) {

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
