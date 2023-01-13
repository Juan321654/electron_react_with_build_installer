server with sequelize not working yet, but was able to make in the `preload.js` an internal express server which works 

possible fix: in `preload.js` somehow add server > index.js to be able to run the server

cd to root folder `npm i`

`npm run start`

`npm run build`

`master` branch status: working

`server` branch status: working (not when installed, only when launch from dist icon)

1. npx create-react-app <your_app_name>
2. npm i cross-env electron-is-dev
3. npm i -D concurrently electron electron-builder wait-on
4. Now create a file “electron.js” inside Public folder of your project directory, and paste code below inside that —
5.
```js
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```
6. in `package.json` add the following
```
"description": "<your project description>",
"author": "<author of app>",
"build": {
"appId": "<com.your_app>"
},
"main": "public/electron.js",
"homepage": "./",
```
7. update `"scripts"`
```
"scripts": {
"react-start": "react-scripts start",
"react-build": "react-scripts build",
"react-test": "react-scripts test --env=jsdom",
"react-eject": "react-scripts eject",
"electron-build": "electron-builder",
"release": "yarn react-build && electron-builder --publish=always",
"build": "yarn react-build && yarn electron-build",
"start": "concurrently \"cross-env BROWSER=none yarn react-start\" \"wait-on http://localhost:3000 && electron .\""
},
```
8. to test and see it on development
`npm run start`

9. to `build` 
`npm run build`

10. a new folder will appear in the root folder and you only need the 
`<react app name> Setup <version>` installer to distribute to others