import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

};
// next.config.js
module.exports = {
  // ... other config
  outputFileTracingIncludes: {
    '/*': ['node_modules/@swc/helpers/**/*']
  }
}

export default nextConfig;
