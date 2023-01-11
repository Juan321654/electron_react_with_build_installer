const express = require("express");
const app = express();
const port = 3007;
const cors = require("cors");
const usersRoute = require("./routes/users");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
  })
);

app.use(express.json());

const API_URL = "/api/v1";

app.use(API_URL, usersRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Driver Designer server listening on port ${port}!`)
);
