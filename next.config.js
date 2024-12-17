// next.config.js

const nextConfig = {
  /* Aquí van tus configuraciones */
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    return config;
  }
};

module.exports = nextConfig; // Usar 'module.exports' en lugar de 'export default'
