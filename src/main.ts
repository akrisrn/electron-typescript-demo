import {app, BrowserWindow} from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow | null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

app.on("ready", createWindow);
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
