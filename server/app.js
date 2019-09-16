const express = require("express");

const apiRouter = require("./routers/apiRouter");

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "route not found" });
});

app.use((err, req, res, next) => {
  //   console.log(err);
  if (err.code) res.status(400).send({ msg: err.message });
  else res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
