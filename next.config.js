module.exports = {
    async redirects() {
      return [
        // Basic redirect
        {
          source: '/',
          destination: '/properties',
          permanent: true,
        },
      ]
    },
  }