import { spawn } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const parkedDir = path.join(root, "src", "app", "_api_parked");
const parked = existsSync(apiDir);
if (parked) renameSync(apiDir, parkedDir);

function restore() {
  if (parked && existsSync(parkedDir)) renameSync(parkedDir, apiDir);
}

const child = spawn("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, BUILD_TARGET: "apk" },
});

child.on("exit", (code) => {
  restore();
  process.exit(code ?? 1);
});
child.on("error", () => {
  restore();
  process.exit(1);
});
