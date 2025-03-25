import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import fs from 'fs/promises';

// Vite config with Vitest test environment set to jsdom
export default defineConfig({
  assetsInclude: ['**/*.WebP'],
  plugins: [react()],
  test: {
    globals: true, // Enable global variables for tests (like `document`, `window`, etc.)
    environment: 'jsdom',// Set the test environment to jsdom
    setupFiles: 'src/setupTests.js',
    env: {
      REACT_APP_SERVER_URL: "http://127.0.0.1:8000/",
      REACT_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyOTA0Mzc5LCJpYXQiOjE3NDI5MDMwMDIsImp0aSI6IjBjOTM3YTlmNWY0NTRkMmViMWE5MWU3NmQ0MzBlM2IzIiwidXNlcl9pZCI6Mjl9.3kG3py0wQG44x8HYeg2D-yIY_5rxO6yplGGIzqc_n6s"
    }
},
esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
});