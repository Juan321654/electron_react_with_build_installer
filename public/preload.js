const { exec } = require("child_process");
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener("DOMContentLoaded", () => {
// });
exec(`npm run start-server`);
