import { defineConfig } from "vite";
import { resolve } from 'path';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
  console.log("vite config mode:" + mode);

  const rootSource = "src";

  let plugins = [];
  let folder = "dist";
  let target = "es2020";
  let rolldownOptions= {
    input: {
      main: resolve(__dirname, rootSource + '/index.html'),
    }
  };
  let assetsInlineLimit = 4096;

  switch (mode) {
    case "static":
      plugins.push(viteSingleFile());
      target = 'es2015';
      folder = "static";
      rolldownOptions = {};
      assetsInlineLimit = 10000000000;
      break;
    default:
  }

  const root = './src';
  const emptyOutDir = true;
  const outDir = "../" + folder;
  const minify = true;
  const sourcemap = false;

  return {
    build: {
      assetsInlineLimit,
      emptyOutDir,
      minify,
      outDir,
      rolldownOptions,
      sourcemap,
      target
    },
    plugins,
    root,
  };
});