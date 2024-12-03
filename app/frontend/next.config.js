module.exports = {
    webpack: (config => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 0,
          ignored: ['**/node_modules']
        }
        return config
      })
  };
  