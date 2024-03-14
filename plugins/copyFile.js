import path from "path";
import fs from "fs";

export function copyFile(from, to, overwrite = false) {
  return {
    name: "copy-file",
    generateBundle() {
      const log = msg => console.log("\x1b[36m%s\x1b[0m", msg);
      log(`copy file: ${from} → ${to}`);
      const fromFile = `${process.cwd()}/${from}`;
      const toFile = `${process.cwd()}/${to}`;
      if (fs.existsSync(toFile) && !overwrite) return;
      log(`• ${fromFile} → ${toFile}`);
      fs.copyFileSync(path.resolve(fromFile), path.resolve(toFile));
    }
  };
}
