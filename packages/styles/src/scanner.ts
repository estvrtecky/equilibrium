import path from "node:path";
import { glob } from "glob";

export class Scanner {
  constructor(private root: string) {}

  scan(content: string[]): string[] {
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
}
