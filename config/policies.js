module.exports.policies = {
  '*': 'sessionAuth',
  'Users/UserDetailsController': {
    createUser: true
  },
  'Users/loginController': {
    initLogin: true
  },
  'FileController': {
  	upload: true
  }
};
