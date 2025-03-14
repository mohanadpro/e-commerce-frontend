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
    setupFiles: 'src/setupTests.js'
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