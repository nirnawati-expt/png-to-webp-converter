import { defineConfig } from "vite";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import { viteStaticCopy } from "vite-plugin-static-copy";
import manifestBase from "./manifest.json";
import manifestChrome from "./src/chrome/manifest.json";

export default defineConfig(({ mode }) => {
  console.log("vite config mode:" + mode);

  const rootSource = "src";

  let plugins = [];
  let folder = "dist";
  let target = "es2020";

  const external = [`${rootSource}/background.js`]; // exclude background.js from build result if not building for browser extension
  const input = {
    main: resolve(__dirname, `${rootSource}/index.html`),
  };
  let rolldownOptions = { external, input };

  let assetsInlineLimit = 0; // all assets is moved to ${outDir}/assets

  switch (mode) {
    case "static":
      plugins.push(viteSingleFile());
      target = "es2015";
      folder = "static";
      rolldownOptions = { external };
      assetsInlineLimit = 10000000000;
      break;
    case "chrome-ext":
      folder = "dist_chrome-ext";
      plugins.push({
        name: "generate-manifest-from-json",
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "manifest.json",
            source: JSON.stringify(
              { ...manifestBase, ...manifestChrome },
              null,
              2,
            ),
          });
        },
      });
      plugins.push(
        viteStaticCopy({
          targets: [
            {
              src: `./chrome/background.js`,
              dest: `../${folder}`,
              rename: { name: "background.js", stripBase: true },
            },
          ],
        }),
      );
      break;
    default:
  }

  const root = `./${rootSource}`;
  const emptyOutDir = true;
  const outDir = `../${folder}`;
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
      target,
    },
    plugins,
    root,
  };
});
