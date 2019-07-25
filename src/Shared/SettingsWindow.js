import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";

export const createSettingsWindow = parent => {
  const settingsWindow = new BrowserWindow({
    width: 760,
    height: 540,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false,
    maximizable: false,
    alwaysOnTop: true,
    vibrancy: "light"
  });

  settingsWindow.loadURL(
    isDev
      ? "http://localhost:3000#/settings/"
      : `file://${path.join(__dirname, "../build/index.html#/setttings")}`
  );

  if (isDev) {
    // Open the DevTools.
    settingsWindow.webContents.openDevTools();
  }
  return settingsWindow;
};
