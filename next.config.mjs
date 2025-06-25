/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async redirects() {
    return[
      {
        source:'/',
        has:[
          {
            type:'host',
            value:'keralapsclive.com'
          },
        ],
        destination:'https://www.keralapsclive.com/:path*',
        permanent:true
      }
    ]
    
  }
  
};

export default nextConfig;
