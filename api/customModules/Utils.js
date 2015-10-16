var url = require('url');
var https = require('https');
var http = require('http');
var constants = require('./Constants');
module.exports = {


  parseValidationErrorObject: function (model, validationErrorObject) {
    var validationResponse = {};
    var messages = model.validationMessages;
    validationFields = Object.keys(messages);
    validationFields.forEach(function (validationField) {

      if (validationErrorObject[validationField]) {

        var FieldToProcess = validationErrorObject[validationField];
        FieldToProcess.forEach(function (rule) {

          if (messages[validationField][rule.rule]) {
            if (!(validationResponse[validationField] instanceof Array)) {

              validationResponse[validationField] = new Array();

            }
            var newMessage = {
              'rule': rule.rule,
              'message': messages[validationField][rule.rule]
            }
            validationResponse[validationField].push(newMessage);
          }

        });
      }

    });
    return validationResponse;
  },
  getResponseObject: function (model, err, responseCode, responseMessage) {
    var responseObject = {};
    if (err) {

      err.invalidAttributes = this.parseValidationErrorObject(model, err.invalidAttributes);
      responseObject['message'] = err.invalidAttributes;
    } else {
      responseObject['message'] = responseMessage;
    }
    responseObject['responseCode'] = responseCode;
    return responseObject;
  },

  getValidName: function (optionName) {
    var name = optionName.toLowerCase();
    var splitName = name.split(" ");
    var validName = "";
    for (var i in splitName) {
      splitName[i] = splitName[i].trim();
      if (splitName[i] != "") {
        var charAtZero = splitName[i].charAt(0).toUpperCase();
        var sModified = splitName[i].replace(splitName[i].charAt(0), charAtZero);
        validName += " " + sModified;
      }

    }
    return validName.trim();
  },

  getCurrentMonth: function () {
    var today = new Date();
    return today.getMonth();
  },
  getQueryString: function (req) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    return query;
  },
  networkCallback: function (callback) {

    var cb = function (response) {
      var responseString = '';
      response.setEncoding('utf8');
      response.on('data', function (data) {
        responseString += data;
      });
      response.once('error', function (err) {
        callback(err, null);
      });
      response.on('end', function () {
        try {
          //console.log(responseString);
          callback(null, JSON.parse(responseString));
        } catch (err) {
          callback(err, null);
        }

      });

    }
    return cb;

  },
  doNetworkCallHttps: function (options, callback) {
    var request = https.request(options, this.networkCallback(callback)).end();
  },
  doNetworkCallHttp: function (options, callback) {
    console.log(options);
    var request = http.request(options, this.networkCallback(callback)).end();
  },

  convertBase: function (num) {
    return {
      from: function (baseFrom) {
        return {
          to: function (baseTo) {
            return parseInt(num, baseFrom).toString(baseTo);
          }
        };
      }
    };
  },

  getSearchObject: function (searchObject) {
    var searchCriteria = [];
    for (var key in searchObject) {
      var a = {};
      if (key == "token" || key == "active" || key == "page" || key == "limit")
        continue;
      a[key] = searchObject[key];
      searchCriteria.push(a);
    }
    return searchCriteria;
  },

  getHeaderInfoForExpedia: function (req) {
    var ipAdd = req.ip;

    var userAgentRaw = req.headers['user-agent'];
    var userAgent = userAgentRaw.split(')');
    var userAgentFinal = userAgent[0] + ")";
    var dataToReturn = {};
    dataToReturn.ipAddr = ipAdd;
    dataToReturn.userAgent = userAgentFinal;
    return dataToReturn;
  },

  getSignatureForExpedia: function () {
    var crypto = require('crypto');

    var signature = crypto.createHash('md5').update(constants.expedia_apiKey
      + constants.expedia_sharedSecret + (Math.floor(new Date() / 1000))).digest("hex");
    return signature;
  },

  convertTimeto24hr: function (time) {
    if (time.substring(time.length - 2, time.length) == 'PM') {
      var array = time.split(":");
      var hours = parseInt(array[0]);
      var minutes = array[1].substring(0, 2);
      if (hours < 12) {
        hours += 12;
      }
      if (hours.toString().length < 2) {
        hours = "0" + hours;
      }
      time = hours + ":" + minutes;
    } else {
      time = time.substring(0, 5);
    }
    return time;
  }

}
