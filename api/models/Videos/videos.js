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
      type: 'string'
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
      via: 'video'
    }

  },
  addVideo: function (data, callback) {
    videos.create(data, function (err, addedVideo) {
      var resposne = {};
      if (err) {
        console.log(err);
        resposne = sails.config.getResponseObject(videos, null, 500, 'Internal Server Error');
      } else {
        resposne = sails.config.getResponseObject(videos, null, 200, 'Video Added');
        if (data.new_tag) {
          addedVideo.tags.add({tag_name: data.new_tag});
        }
        addedVideo.save(function (err) {
          if (err) {
            console.lgo(err);
          }
        });
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
  }
};
