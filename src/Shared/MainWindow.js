import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import os from "os";

const DEVTOOLS_PATH = path.join(
  os.homedir(),
  "/Library/Application Support/BraveSoftware/Brave-Browser/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0/"
);

export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    BrowserWindow.addDevToolsExtension(DEVTOOLS_PATH);
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
};
