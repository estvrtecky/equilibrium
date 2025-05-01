import fs from "node:fs";
import path from "node:path";
import postcss, { type AcceptedPlugin, type PluginCreator } from "postcss";

import { loadConfig } from "./config";
import { CSSParser } from "./css-parser";
import { Scanner } from "./scanner";

function equilibrium(opts: any): AcceptedPlugin {
  const projectRoot = process.cwd();
  const packagePath = path.join(projectRoot, "node_modules", "equilibrium-css");
  const scanner = new Scanner(projectRoot);
  const cssParser = new CSSParser(packagePath);

  return {
    postcssPlugin: "equilibrium-css",
    Once(root) {
      console.log("Processing CSS with Equilibrium CSS...");

      const config = loadConfig();

      const allFiles = scanner.scanForFiles(config.content);
      const allClasses = scanner.scanForClasses(allFiles);

      root.walkAtRules((atRule) => {
        if (atRule.name === "equilibrium") {
          if (atRule.params === "index") {
            try {
              const cssPath = path.join(packagePath, "index.css");
              const parsed = cssParser.parse(cssPath);

              atRule.replaceWith(parsed.nodes);
            } catch (err) {
              console.error("[Equilibrium CSS] Error loading index.css:", err);
              atRule.remove();
            }
          } else if (atRule.params === "theme") {
            try {
              const themePath = path.join(packagePath, "theme.css");
              const parsed = cssParser.parse(themePath);

              atRule.replaceWith(parsed.nodes);
            } catch (err) {
              console.error("[Equilibrium CSS] Error loading theme.css:", err);
              atRule.remove();
            }
          } else if (atRule.params === "base") {
            try {
              const basePath = path.join(packagePath, "base.css");
              const parsed = cssParser.parse(basePath);

              atRule.replaceWith(parsed.nodes);
            } catch (err) {
              console.error("[Equilibrium CSS] Error loading base.css:", err);
              atRule.remove();
            }
          } else if (atRule.params === "components") {
            try {
              const componentsPath = path.join(packagePath, "components.css");
              const parsed = cssParser.parse(componentsPath, allClasses);

              atRule.replaceWith(parsed.nodes);
            } catch (err) {
              console.error(
                "[Equilibrium CSS] Error loading components.css:",
                err
              );
              atRule.remove();
            }
          } else if (atRule.params === "utilities") {
            try {
              const utilitiesPath = path.join(packagePath, "utilities.css");
              const parsed = cssParser.parse(utilitiesPath, allClasses);

              atRule.replaceWith(parsed.nodes);
            } catch (err) {
              console.error(
                "[Equilibrium CSS] Error loading utilities.css:",
                err
              );
              atRule.remove();
            }
          }
        }
      });
    },
    OnceExit(root) {
      console.log("Finished processing CSS with Equilibrium CSS.");
    },
  };
}

export default Object.assign(equilibrium, {
  postcss: true,
}) as PluginCreator<any>;
