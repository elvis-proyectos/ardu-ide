import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Habilitar el modo estricto de React (recomendado para desarrollo)
  experimental: {
    // Si estás usando alguna opción experimental, asegúrate de que sea válida
    // Ejemplo: desactivar el precargado de documentos para mejorar rendimiento
    appDir: true, // Activar el nuevo sistema de enrutamiento basado en 'app'
  },
  // Otras configuraciones que podrías necesitar
  webpack(config) {
    // Configuración personalizada de webpack si es necesario
    return config;
  }
};

export default nextConfig;
