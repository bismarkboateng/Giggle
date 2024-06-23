/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "i.redd.it",
            port: '',
          },
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            port: '',
          },
          {
            protocol: "https",
            hostname: "as1.ftcdn.net",
            port: '',
          },
        ],
      },
};

export default nextConfig;
