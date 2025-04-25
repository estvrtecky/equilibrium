import fs from "node:fs";
import path from "node:path";
import postcss, { type AcceptedPlugin, type PluginCreator } from "postcss";

function equilibrium(opts: any): AcceptedPlugin {
  return {
    postcssPlugin: "equilibrium-css",
    Once(root) {
      console.log("Processing CSS with Equilibrium CSS...");
    },
    OnceExit(root) {
      console.log("Finished processing CSS with Equilibrium CSS.");
    },
    AtRule(atRule) {
      if (atRule.name === "equilibrium") {
        console.log("Processing Equilibrium at-rule:", atRule.params);
        if (atRule.params === "index") {
          try {
            const projectRoot = process.cwd();
            const cssPath = path.join(
              projectRoot,
              "node_modules",
              "equilibrium-css",
              "index.css"
            );
            console.log(cssPath);

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
    },
  };
}

export default Object.assign(equilibrium, {
  postcss: true,
}) as PluginCreator<any>;
