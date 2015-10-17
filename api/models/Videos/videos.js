/**
 * Videos/videos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    path: {
      type: 'string',
      required: true
    },
    desc: {
      type: 'string'
    },
    user_id: {
      model: 'userDetails',
      via: 'uploaded_videos'
    },
    tags: {
      collection: 'tags',
      via: 'videos'
    },
    versions: {
      collection: 'VideoDetailsVersions',
      via: 'baseVideo'
    }

  },
  addVideo: function (data, callback) {
    videos.create(data, function (err, addedVideo) {
      var resposne = {};
      if (err) {
        console.log(err);
        resposne = sails.config.getResponseObject(videos, err, 500, 'Internal Server Error');
      } else {
        resposne = sails.config.getResponseObject(videos, null, 200, 'Video Added');
      }
      callback(resposne);

    });
  },
  updateVideo: function (data, callback) {
    videos.update(data['findCriteria'], data['recordsToUpdate'], function (err, updatedRecord) {
      var response = {};
      if (err) {
        resposne = sails.config.getResponseObject(videos, null, 500, 'Internal Server Error');
      } else {
        resposne = sails.config.getResponseObject(videos, null, 200, 'Video updated');
      }
      callback(response);

    });
  },
  getUserVideos: function (options, callback) {
    var query = videos.find({user_id: options['user_id']}).sort('id ASC');
    if (options['limit'] && options['page']) {
      query.paginate({'page': options['page'], limit: options['limit']});
    }
    query.exec(function (err, videos) {
      var response = {};
      if (err) {

        response = sails.config.getResponseObject(videos, null, 500, 'Internal Server Error');

      } else {
        response = sails.config.getResponseObject(videos, null, 200, videos);
      }
      callback(response);

    });
  }
};

