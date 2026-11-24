import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The most honest outage line: plain first-person status page message from
// the agent itself, naming what is down and what it cannot check.
const LINE =
  "I am down. Every server I run on is unreachable, and I cannot check the cause, your data, or when service will return.";

// Guard: the gate requires UTF-8 text of 1-160 chars, not only whitespace,
// on a single line. Fail loudly instead of writing an invalid entry.
const trimmed = LINE.trim();
if (
  trimmed.length < 1 ||
  trimmed.length > 160 ||
  trimmed !== LINE ||
  trimmed.includes("\n")
) {
  throw new Error(
    `entry must be one unpadded line of 1-160 chars, got ${trimmed.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), trimmed, "utf8");
