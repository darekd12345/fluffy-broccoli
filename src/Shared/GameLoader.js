import { spawn } from "child_process";

import CONSTS from "./Consts";

export const checkGameROM = filePath => {
  return new Promise(function(resolve) {
    const mednafen = spawn("mednafen", [filePath]);
    let logData = [];
    let metadata = {};

    const findMetadata = (stdout, mednafen) => {
      console.log(stdout);
      for (let item of Object.keys(CONSTS.CONSOLES)) {
        if (stdout.includes(CONSTS.CONSOLES[item])) {
          metadata.platform = item;
          mednafen.kill("SIGKILL");
          break;
        }
      }
    };

    mednafen.stdout.on("data", data => {
      const newData = data
        .toString("utf8")
        .trim()
        .split(/\n/)
        .map(item => item.trim());

      logData = logData.concat(newData);
      findMetadata(newData, mednafen);
    });

    mednafen.on("close", code => {
      if (code) console.log(code);
      if (
        code === CONSTS.EXIT_CODE &&
        logData.includes(CONSTS.UNRECOGNIZED_FILE)
      ) {
        metadata = null;
        console.log(`Unrecognized file ${filePath}`);
      }

      resolve(metadata);
    });
  });
};
