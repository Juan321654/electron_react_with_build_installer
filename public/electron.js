const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { exec } = require("child_process");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    title: "Electron build test",
    webPreferences: {
      show: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
      // ctrl + shift + i to open dev tools
      devTools: true,
      webSecurity: false,
      originWhitelist: ["*"],
      disableBlinkFeatures: "OutOfBlinkCors",
      sandbox: false,
      allowRunningInsecureContent: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.webContents.session.on(
    "preconnect",
    (event, preconnectUrl, allowCredentials) => {
      event.preventDefault();
      allowCredentials = true;
      preconnectUrl = "http://localhost:3007/hello";
    }
  );
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => (mainWindow = null));
}

app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    exec(`taskkill -F -IM node.exe`, exitApp);
    function exitApp() {
      app.quit();
    }
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
