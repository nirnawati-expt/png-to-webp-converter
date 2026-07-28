import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig(() => {
  const outDir = "dist";
  const manifest = "manifest.json";

  return {
    root: './src',
    plugins: [],
    build: {
      outDir: "../" + outDir,
      emptyOutDir: true,
      rolldownOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
        }
      }
    },
  };
});