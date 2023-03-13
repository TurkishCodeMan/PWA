/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register:true
});


module.exports = withPWA({
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt"],
  },
});
