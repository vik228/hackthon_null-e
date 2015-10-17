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
      collection: 'VideoDetailsVersion',
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
        var versionUpdateObj = {};
        versionUpdateObj['baseVideo'] = addedVideo['id'];
        versionUpdateObj['owner'] = addedVideo['user_id'];
        versionUpdateObj['parentId'] = addedVideo['id'];
        versionUpdateObj['data'] = data['data'];
        addedVideo.versions.add(versionUpdateObj);
        addedVideo.save(function (err) {
          console.log(err)
        });
      }
      callback(resposne);

    });
  },
  updateVideo: function (data, callback) {
    videos.findOne(data['findCriteria'], function (err, record) {
      var response = {};
      if (err) {
        response = sails.config.getResponseObject(videos, null, 500, 'Internal Server Error');
      } else {
        response = sails.config.getResponseObject(videos, null, 200, 'Video updated');
        for (var key in data['recordsToUpdate']) {
          if (key === "tags") {
            record[key].add(data['recordsToUpdate'][key]);
          } else {

            record[key] = data['recordsToUpdate'][key];
          }
        }
        record.save(function (err) {
          console.log(err)
        });
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

