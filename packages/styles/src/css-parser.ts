import fs from "fs";
import path from "path";
import postcss from "postcss";

export class CSSParser {
  constructor(private packagePath: string) {}

  parse(cssFilePath: string, filterClasses?: string[]): postcss.Root {
    try {
      const cssContent = fs.readFileSync(cssFilePath, "utf-8");
      const parsed = postcss.parse(cssContent, {
        from: cssFilePath,
      });

      // Handle @import rules
      parsed.walkAtRules((atRule) => {
        if (atRule.name === "import") {
          const importPath = path.join(
            this.packagePath,
            atRule.params.replace(/['"]/g, "").trim()
          );
          const importContent = fs.readFileSync(importPath, "utf-8");
          const importParsed = postcss.parse(importContent, {
            from: importPath,
          });
          atRule.replaceWith(importParsed.nodes);
        }
      });

      // Handle filtering of unused classes
      if (filterClasses) {
        parsed.walkRules((rule) => {
          const classNames = rule.selector.match(/\.[a-zA-Z0-9_-]+/g) || [];

          const isClassUsed = classNames.some((className) => {
            return filterClasses.includes(className.replace(".", ""));
          });

          if (!isClassUsed) {
            rule.remove();
          }
        });
      }

      return parsed;
    } catch (error) {
      console.error(`Error parsing CSS file at ${cssFilePath}:`, error);
      throw error;
    }
  }
}
