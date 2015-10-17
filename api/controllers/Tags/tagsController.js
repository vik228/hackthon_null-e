/**
 * Tags/tagsController
 *
 * @description :: Server-side logic for managing Tags/tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getAllTags: function (req, res) {
    tags.getAllTags(function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  }

};

