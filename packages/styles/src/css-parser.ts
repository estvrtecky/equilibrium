import fs from "fs";
import path from "path";
import postcss from "postcss";

export class CSSParser {
  constructor(private packagePath: string) {}

  parse(cssFilePath: string): postcss.Root {
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

      return parsed;
    } catch (error) {
      console.error(`Error parsing CSS file at ${cssFilePath}:`, error);
      throw error;
    }
  }
}
