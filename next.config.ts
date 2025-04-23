import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

interface WebpackConfig {
  resolve: {
    alias: { [key: string]: string };
  };
}

export default nextConfig;
