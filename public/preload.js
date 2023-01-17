const { exec } = require("child_process");
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
exec(`npm run start-server`);


const express = require('express');
const app = express();
const port = 3008;
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));