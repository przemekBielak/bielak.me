const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const serveIndex = require("serve-index");
const basicAuth = require("express-basic-auth");
const fs = require("fs");

const authInfo = JSON.parse(fs.readFileSync("./authInfo.json"));
console.log(authInfo);

const PORT = process.env.PORT || 8080;
const app = express();

// app.use(history({}));
app.use(express.static(path.join(__dirname, "./dist/")));

app.use(
  "/files",
  basicAuth({
    challenge: true,
    users: authInfo
  }),
  express.static("./files"),
  serveIndex("./files", { icons: true })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// how to start:
// sudo docker build -t bielak.me-node .
// sudo docker run -d -p 8080:8080 -v /home/przemek/www/bielak.me/files:/usr/src/bielak.me/files  bielak.me-node
