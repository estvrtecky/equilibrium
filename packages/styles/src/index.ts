import fs from "node:fs";
import path from "node:path";
import postcss, { type AcceptedPlugin, type PluginCreator } from "postcss";

import { scanProjectFiles } from "./scanner";

function equilibrium(opts: any): AcceptedPlugin {
  return {
    postcssPlugin: "equilibrium-css",
    Once(root) {
      console.log("Processing CSS with Equilibrium CSS...");

      root.walkAtRules((atRule) => {
        if (atRule.name === "equilibrium") {
          if (atRule.params === "index") {
            try {
              const projectRoot = process.cwd();
              const cssPath = path.join(
                projectRoot,
                "node_modules",
                "equilibrium-css",
                "index.css"
              );

              const cssContent = fs.readFileSync(cssPath, "utf-8");
              const parsed = postcss.parse(cssContent, {
                from: cssPath,
              });

              atRule.replaceWith(parsed.nodes);
            } catch (err) {
              console.error("[Equilibrium CSS] Error loading index.css:");
              atRule.remove();
            }
          }
        }
      });

      const projectRoot = process.cwd() + "/src";
      const allFiles = scanProjectFiles(projectRoot, /.*/);
      console.log("Found files:", allFiles);
    },
    OnceExit(root) {
      console.log("Finished processing CSS with Equilibrium CSS.");
    },
  };
}

export default Object.assign(equilibrium, {
  postcss: true,
}) as PluginCreator<any>;
