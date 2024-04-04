/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:3001/',
  },
  async rewrites() {
    return [
      {
        source: "/lioren/comunas",
        destination: "https://www.lioren.cl/api/comunas",
      },
      {
        source: "/lioren/ciudades",
        destination: "https://www.lioren.cl/api/ciudades",
      },
    ];
  },
};

export default nextConfig;
