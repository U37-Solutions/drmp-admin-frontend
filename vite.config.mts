import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //     '@components': path.resolve(__dirname, './src/components'),
  //     '@features': path.resolve(__dirname, './src/features'),
  //   },
  // },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    tsconfigPaths(),
    react(),
  ],
});
