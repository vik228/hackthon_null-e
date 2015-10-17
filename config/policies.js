module.exports.policies = {
  '*': 'sessionAuth',
  'Users/UserDetailsController': {
    createUser: true
  },
  'Users/loginController': {
    initLogin: true
  },
  'Videos/ContentController': {
    createContent: true
  },
  'Videos/TransactionController': {
    createTransaction: true
  }

};
