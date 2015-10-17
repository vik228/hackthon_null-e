/**
 * Tags/tags.js
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
    tag_name: {
      type: 'string'
    },
    videos: {
      collection: 'videos',
      via: 'tags'
    }

  },
  getAllTags: function (callback) {
    tags.find().exec(function (err, tags) {
      var response = {};
      if (err) {

        response = sails.config.getResponseObject(tags, null, 500, 'Internal Server Error');

      } else {
        response = sails.config.getResponseObject(tags, null, 500, tags);

      }
      callback(response);

    })
  }
};

