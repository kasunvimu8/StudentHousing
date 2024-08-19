module.exports = {
  images: {
    domains: ["localhost", "https://217.92.198.91/"],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/properties",
        permanent: true,
      },
    ];
  },
};
