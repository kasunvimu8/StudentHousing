module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/file/**",
      },
      {
        protocol: "https",
        hostname: "217.92.198.91",
        port: "",
        pathname: "/api/file/**",
      },
      {
        protocol: "http",
        hostname: "217.92.198.91",
        port: "3000",
        pathname: "/api/file/**",
      },
    ],
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
