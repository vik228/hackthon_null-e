/**
 * Users/userDetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var utils = require('../../customModules/Utils.js');
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

    userDetails.create(users, function (err, addedUser) {

      var resposne = {};
      if (err) {
        resposne = utils.getResponseObject(userDetails, err, 400, null);
      } else {
        resposne = utils.getResponseObject(userDetails, null, 200, "user added");
      }
      callback(resposne);

    });

  }
};

