import { defineConfig } from "vite";
import { resolve } from 'path';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import manifestChrome from './manifest.chrome.json';

export default defineConfig(({ mode }) => {
  console.log("vite config mode:" + mode);

  const rootSource = "src";

  let plugins = [];
  let folder = "dist";
  let target = "es2020";

  const external = [rootSource + '/background.js']; // exclude background.js from build result if not building for browser extension
  const input = {
    main: resolve(__dirname, rootSource + '/index.html'),
  };
  let rolldownOptions= { external, input };

  let assetsInlineLimit = 0; // all assets is moved to ${outDir}/assets

  switch (mode) {
    case "static":
      plugins.push(viteSingleFile());
      target = 'es2015';
      folder = "static";
      rolldownOptions = { external };
      assetsInlineLimit = 10000000000;
      break;
    case "chrome-ext":
      manifest.background = manifestChrome.background;
      plugins.push(crx({ manifest }))
      folder = "dist_chrome-ext";
      rolldownOptions= { input };
      break;
    default:
  }

  const root = './' + rootSource;
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