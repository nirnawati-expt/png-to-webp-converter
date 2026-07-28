import { defineConfig } from "vite";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import { viteStaticCopy } from "vite-plugin-static-copy";
import manifestBase from "./manifest.json";
import manifestChrome from "./src/chrome/manifest.json";
import manifestMozilla from "./src/mozilla/manifest.json";

function constructManifestJsonPlugin(manifest) {
  return {
    name: "generate-manifest-from-json",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "manifest.json",
        source: JSON.stringify({ ...manifestBase, ...manifest }, null, 2),
      });
    },
  };
}

/**
 * Calculates the total cost.
 * @param {string} subFolderSource - sub folder name of the source file, from /src directory
 * @param {string} outputFolder - output folder name where the file is copied
 * @param {string} fileName - file name and type that want to be copied, for example: 'script.js'
 * @returns {} Object copy properties for viteStaticCopy.
 */
function constructStaticCopyProperties(
  subFolderSource,
  outputFolder,
  fileName,
) {
  return {
    src: `./${subFolderSource}/${fileName}`,
    dest: outputFolder,
    rename: { name: fileName, stripBase: true },
  };
}

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

  const backgroundFileName = "background.js";
  switch (mode) {
    case "static":
      plugins.push(viteSingleFile());
      target = "es2015";
      folder = "static";
      rolldownOptions = { external };
      assetsInlineLimit = 10000000000;
      break;
    case "chrome-ext":
      browser_name = "chrome";
      folder = `dist_${browser_name}`;
      plugins.push(constructManifestJsonPlugin(manifestChrome));
      plugins.push(
        viteStaticCopy({
          targets: [
            constructStaticCopyProperties(
              browser_name,
              `../${folder}`,
              backgroundFileName,
            ),
          ],
        }),
      );
      break;
    case "mozilla-ext":
      browser_name = "mozilla";
      folder = `dist_${browser_name}`;
      plugins.push(constructManifestJsonPlugin(manifestMozilla));
      plugins.push(
        viteStaticCopy({
          targets: [
            constructStaticCopyProperties(
              browser_name,
              `../${folder}`,
              backgroundFileName,
            ),
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
