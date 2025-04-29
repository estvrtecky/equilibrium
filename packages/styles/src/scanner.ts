import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";

import { parseClassAttribute } from "./utils/classnames";

export class Scanner {
  private static readonly CLASSES_REGEX = [
    /class=['"`]([^'"`]+)['"`]/g,
    /className=['"`]([^'"`]+)['"`]/g,
    /className={`([^`]+)`}/g,
  ];
  private static readonly COMBINED_CLASSES_REGEX = new RegExp(
    Scanner.CLASSES_REGEX.map((regex) => regex.source).join("|"),
    "g"
  );

  constructor(private root: string) {}

  readFile(filePath: string): string {
    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return "";
    }
  }

  scanForFiles(content: string[]): string[] {
    const results: string[] = [];

    for (const pattern of content) {
      if (typeof pattern === "string") {
        const normalizedPattern = path.posix.join(
          this.root.replace(/\\/g, "/"),
          pattern.replace(/\\/g, "/")
        );

        const matchedFiles = glob.sync(normalizedPattern);
        results.push(...matchedFiles);
      }
    }

    return results;
  }

  scanForClasses(filePaths: string[]): string[] {
    const results: string[] = [];

    for (const filePath of filePaths) {
      const fileContent = this.readFile(filePath);
      const classNames =
        fileContent.match(Scanner.COMBINED_CLASSES_REGEX) || [];
      for (const className of classNames) {
        const parsedClassNames = parseClassAttribute(className);
        for (const parsedClassName of parsedClassNames) {
          if (!results.includes(parsedClassName)) {
            results.push(parsedClassName);
          }
        }
      }
    }

    return results;
  }
}
