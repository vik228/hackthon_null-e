/**
 * Videos/TransactionController
 *
 * @description :: Server-side logic for managing videos/transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createTransaction: function (req, res) {

    var data = req.body.data;
    Transaction.add(data, function (responseObj) {

      res.status(responseObj['responseCode']);
      res.json({response: responseObj});

    });
  }
	
};

