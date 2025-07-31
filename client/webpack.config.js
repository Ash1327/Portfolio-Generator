const path = require('path');

module.exports = {
  devServer: {
    allowedHosts: ['localhost', '.localhost'],
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
}; 