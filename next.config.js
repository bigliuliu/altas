/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dgrajdspl/**",
      },
      {
        protocol: "https",
        hostname: "www.businessdailyafrica.com",
        port: "",
        pathname: "/resource/image/**",
      },
      {
        protocol: "https",
        hostname: "www.dentonshhm.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "nexusmedia.ug",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.standardmedia.co.ke",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "lands.go.ke",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "nation.africa",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static.ntvkenya.co.ke",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
