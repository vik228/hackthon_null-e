/**
 * Videos/ContentController
 *
 * @description :: Server-side logic for managing videos/contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createContent: function (req, res) {

    var data = req.body.data;
    console.log (data);
    Content.add(data, function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  }
	
};

