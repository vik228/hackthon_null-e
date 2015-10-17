/**
 * Videos/Transaction.js
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
    sender_id: {
      model: 'userDetails',
      via: 'videos_sent'
    },
    receiver_id: {
      model: 'userDetails',
      via: 'videos_received'
    },
    shared_videos: {
      model: 'videoDetailsVersion',
      via: 'all_shares'
    }

  },
  add: function (transaction, callback) {
    Transaction.create(transaction, function (err, addedTransaction) {
      var resposne = {};
      if (err) {
        resposne = sails.config.getResponseObject(Transaction, err, 400, null);
      } else {
        resposne = sails.config.getResponseObject(Transaction, null, 200, "Transaction added");

      }
      callback(resposne);
    });
  }

};

