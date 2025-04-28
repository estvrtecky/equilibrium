import fs from "node:fs";
import path from "node:path";

import type { Config } from "./types/config";

const CONFIG_FILE_NAMES = ["equilibrium.config.js", "equilibrium.config.ts"];

const DEFAULT_CONFIG: Config = {
  content: ["**/*.{js,ts,jsx,tsx,html}"],
};

export function loadConfig(): Config {
  for (const fileName of CONFIG_FILE_NAMES) {
    const filePath = path.resolve(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
      try {
        const config = require(filePath);
        const normalizedConfig = config.default || config;

        if (normalizedConfig && typeof normalizedConfig === "object") {
          if (Object.keys(normalizedConfig).length === 0) {
            return DEFAULT_CONFIG;
          }

          return normalizedConfig as Config;
        }
      } catch (error) {
        console.error(`Failed to load config from ${fileName}:`, error);
      }
    }
  }

  return DEFAULT_CONFIG;
}
