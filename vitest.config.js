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
      REACT_APP_ADMIN_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMjc0MDk1LCJpYXQiOjE3NDMyNzA0OTUsImp0aSI6IjFmNTgwMDlmM2U0ZDRkNTRiNzNjMWE3ZTFjMWJhYzcyIiwidXNlcl9pZCI6Mn0.ALKxPXRJ_0-dWyNNRtnoJGdvlGteoLDFP_pk8gnHHMQ",
      REACT_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMjg4NjMxLCJpYXQiOjE3NDMyODUwMzEsImp0aSI6IjQzMDEzOTA2OTc1OTQ4Nzc4OTA5YjU3YzA3ZTEzMDQxIiwidXNlcl9pZCI6Mjl9.pKlwXznXdEwtQyM3wFehDwO2SiVWdBJ4Djqsq1ikvc4"
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