/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  webpack: (config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 0,
      ignored: ['**/node_modules']
    }
    return config
  }),
};
  