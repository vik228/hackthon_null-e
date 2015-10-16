var redis = require('redis');
var client = redis.createClient();
module.exports = {

  getFromRedis: function (masterKey, key, callback) {
    client.hget(masterKey, key, function (err, data) {

      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }

    });
  },
  insertIntoRedis: function (masterKey, key, data) {
    client.hset(masterKey, key, JSON.stringify(data));
  },
  deleteFromRedis: function (masterKey, key, callback) {
    client.hdel(masterKey, key);
  }

}
