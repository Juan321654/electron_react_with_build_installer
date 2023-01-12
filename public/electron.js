const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { exec } = require("child_process");
const iconPath = path.join(__dirname, "../server/icon.png");

let mainWindow;
let secondWindow;
let tray = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    title: "Electron build test",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // ctrl + shift + i to open dev tools
      devTools: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
    if (process.platform !== "darwin") {
      exec(`taskkill -F -IM node.exe`, exitApp);
      function exitApp() {
        app.quit();
      }
    }
  });
}

function createServerTray() {
  secondWindow = new BrowserWindow({
    width: 900,
    height: 680,
    show: false,
    // title must be different than main window
    title: "server",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  secondWindow.loadFile("server/index.html");
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Close server",
      click: () => {
        exec(`taskkill -F -IM node.exe`, exitApp);
        function exitApp() {
          app.quit();
        }
      },
    },
  ]);
  tray.setToolTip("PI Command Center - server");
  tray.setContextMenu(contextMenu);
}

app.on("ready", () => {
  setTimeout(() => {
    // time out to give server to load data
    createMainWindow();
  }, 3000);
  createServerTray();
});
