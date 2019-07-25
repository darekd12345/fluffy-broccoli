import fs from "fs";
import readline from "readline";

import CONSTS from "./Consts";

export const loadSettingsToJSON = path => {
  return new Promise(function(resolve) {
    const readStream = readline.createInterface({
      input: fs.createReadStream(path)
    });

    let commentOmmited = false;
    const settingsObject = {};
    let currentDescription = null;

    readStream
      .on("line", function(line) {
        if (!commentOmmited && line.length === 0) {
          commentOmmited = true;
        }
        if (commentOmmited && line.length > 0) {
          if (line.charAt(0) === ";") {
            currentDescription = line.slice(1);
          } else if (currentDescription) {
            const key = line.split(" ")[0];
            const data = {};
            data.value = line.split(" ")[1] || "";
            data.description = currentDescription;
            if (CONSTS.SETTINGS_MODULES.indexOf(key.split(".")[0]) > -1) {
              const platformKey = key.split(".")[0];
              const settingsKey = key.substring(platformKey.length + 1);
              if (!settingsObject[platformKey]) {
                settingsObject[platformKey] = {};
              }
              settingsObject[platformKey][settingsKey] = data;
            } else {
              if (!settingsObject["general"]) {
                settingsObject["general"] = {};
              }
              settingsObject["general"][key] = data;
            }
            currentDescription = null;
          }
        }
      })
      .on("close", function() {
        resolve(settingsObject);
      });
  });
};
