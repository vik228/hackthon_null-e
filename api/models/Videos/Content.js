/**
* Videos/Content.js
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
    uuid: {
    	type: 'string',
    },
    DetailVersionId: {
    	model: 'VideoDetailsVersion',
    	via: 'version_id',
    	required: true
    },
    operation_type: {
    	enum: ['add', 'delete'],
      defaultsTo: 'add'
    },
    data: {
    	type: 'json',
      required: true
    }

  },
  validationMessages: {
    DetailVersionId: {
      required: 'DetailVersionId is required'
    },
    data: {
      required: 'data is required'
    }
  },
  add: function (content, callback) {
    console.log(content);
    Content.create(content, function (err, addedContent) {
      var resposne = {};
      if (err) {
        resposne = sails.config.getResponseObject(Content, err, 400, null);
      } else {
        resposne = sails.config.getResponseObject(Content, null, 200, "content added");
      
      }
      callback(resposne);

    });

  }
};

