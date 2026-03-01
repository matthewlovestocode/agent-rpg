#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const readmePath = path.resolve("README.md");
const before = fs.readFileSync(readmePath, "utf8");

try {
  execSync("npm run readme:themes", { stdio: "pipe" });
} catch (err) {
  console.error("Failed to run readme:themes while checking sync.");
  process.exit(2);
}

const after = fs.readFileSync(readmePath, "utf8");
if (before !== after) {
  fs.writeFileSync(readmePath, before);
  console.error("README theme sections are out of sync with theme metadata.");
  console.error("Run: npm run readme:themes");
  process.exit(1);
}

console.log("README theme sections are in sync.");
process.exit(0);
