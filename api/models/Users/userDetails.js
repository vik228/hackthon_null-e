/**
 * Users/userDetails.js
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
    fName: {
      type: 'string',
      required: true
    },
    lNmae: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
      defaultsTo: 'inactive'
    },
    user_id: {
    	collection: 'Video',
    	via: 'UserId'
    }
  },
  validationMessages: {
    fName: {
      required: 'First Name is required'
    },
    email: {
      email: 'Please enter a valid email',
      required: 'Email is required'
    }
  },
  add: function (users, callback) {

    userDetails.create(userskk, function (err, addedUser) {

      var resposne = {};
      if (err) {
        resposne = sails.config.getResponseObject(userDetails, err, 400, null);
      } else {
        resposne = sails.config.getResponseObject(userDetails, null, 200, "user added");
      }
      callback(resposne);

    });

  }
};

