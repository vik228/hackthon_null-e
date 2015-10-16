module.exports.policies = {
  '*': 'sessionAuth',
  'Users/UserDetailsController': {
    initLogin: true
  }
};
