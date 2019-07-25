import { app, ipcMain } from "electron";
import fs from "fs";

import { createSettingsWindow } from "./SettingsWindow";
import { createMainWindow } from "./MainWindow";

let mainWindow, settingsWindow;

function createWindow() {
  mainWindow = createMainWindow();
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("windowEvent", (event, arg) => {
  if (arg === "hide") {
    mainWindow.hide();
  }
  if (arg === "show") {
    mainWindow.show();
  }
  if (arg === "focus") {
    mainWindow.focus();
  }
});

ipcMain.on("Settings", (event, arg) => {
  if (arg === "open" && !settingsWindow) {
    settingsWindow = createSettingsWindow(mainWindow);
    settingsWindow.on("closed", () => (settingsWindow = null));
  }
});

ipcMain.on("saveLibraryToFile", (event, arg) => {
  fs.writeFile(
    "./src/library.json",
    JSON.stringify(arg),
    "utf8",
    function() {}
  );
});
