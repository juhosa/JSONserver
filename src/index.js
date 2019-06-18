import express from "express";

const endpoints = require("../endpoints.json");
console.log(endpoints);

const app = express();
const port = 3000;
const server = require("http").Server(app);

app.get("/", (err, res) => {
  res.status(200);
  res.json({ working: true });
  res.end();
});

app.get("/routes", (err, res) => {
  //   console.log(app._router.stack);
  const routes = app._router.stack
    .filter(x => x.route && x.route.path)
    .map(x => {
      return x.route.path;
    });
  console.log(routes);
  res.status(200);
  res.json({ routes: routes });
  res.end();
});

for (let ep of endpoints.endpoints) {
  console.log(ep);
  if (ep.method === "GET") {
    app.get(`/${ep.url}`, (err, res) => {
      res.status(200);
      res.json({ value: ep.return });
      res.end();
    });
  }
}

server.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log("endpoints working");
});
