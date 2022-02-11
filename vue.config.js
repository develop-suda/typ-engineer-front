module.exports = {
  devServer: {
    watchOptions: {
      poll: true,
    },
    disableHostCheck: true, // ←多分これのおかげ
  },
};
