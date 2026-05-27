import { existsSync } from "node:fs";
import process from "node:process";

/**
 * Side-effect module: load a local `.env` file into `process.env` before the
 * rest of the CLI evaluates, so secrets such as `OPENAI_API_KEY` and overrides
 * like `OPENAI_BASE_URL` can live in `.env` instead of the shell profile.
 *
 * Import this first in the CLI entry point. Semantics:
 * - Loaded from `.env` in the current working directory (the project root).
 * - Missing file is a no-op (never throws), so installs without `.env` work.
 * - Existing shell environment variables win; `.env` only fills the gaps
 *   (verified Node `process.loadEnvFile` behaviour).
 */
const ENV_FILE = ".env";

if (existsSync(ENV_FILE) && typeof process.loadEnvFile === "function") {
	process.loadEnvFile(ENV_FILE);
}
