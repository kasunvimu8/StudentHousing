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
        hostname: "student-housing-burghausen.de",
        port: "",
        pathname: "/api/file/**",
      },
      {
        protocol: "http",
        hostname: "student-housing-burghausen.de",
        port: "",
        pathname: "/api/file/**",
      },
    {
        protocol: "https",
        hostname: "student-housing-lovat.vercel.app",
        port: "",
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
