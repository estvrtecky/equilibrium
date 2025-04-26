import path from "node:path";
import { readdirSync, statSync } from "node:fs";

export function scanProjectFiles(
  directory: string,
  filePattern: RegExp
): string[] {
  const results: string[] = [];

  function scanDir(dir: string) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        scanDir(fullPath);
      } else if (filePattern.test(entry)) {
        results.push(fullPath);
      }
    }
  }

  scanDir(directory);
  return results;
}
