
nextConfig = {
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
  }
module.exports = nextConfig;
