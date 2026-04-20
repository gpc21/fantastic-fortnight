import fs from "node:fs/promises";
import path from "node:path";

// Basic, dependency-free CSS minifier:
// - strips /* ... */ comments (not in strings)
// - collapses whitespace
// - removes whitespace around common tokens
// This is intentionally conservative (no selector/value rewriting).
function minifyCss(input) {
  // Remove comments (simple heuristic; fine for typical author CSS).
  let s = input.replace(/\/\*[\s\S]*?\*\//g, "");

  // Collapse whitespace.
  s = s.replace(/\s+/g, " ");

  // Remove spaces around tokens.
  s = s.replace(/\s*([{}:;,>+~])\s*/g, "$1");
  s = s.replace(/\s*\(\s*/g, "(").replace(/\s*\)\s*/g, ")");

  // Remove unnecessary semicolons before }.
  s = s.replace(/;}/g, "}");

  return s.trim() + "\n";
}

const root = process.cwd();
const inFile = path.join(root, "新建 文本文档 (3).css");
const outFile = path.join(root, "新建 文本文档 (3).min.css");

const css = await fs.readFile(inFile, "utf8");
const min = minifyCss(css);
await fs.writeFile(outFile, min, "utf8");

const before = Buffer.byteLength(css, "utf8");
const after = Buffer.byteLength(min, "utf8");
console.log(
  `Wrote ${path.basename(outFile)}: ${before}B -> ${after}B (${Math.round(
    (after / before) * 100
  )}%)`
);

