const express = require("express");
const cors = require("cors");

const apiRouter = require("./routers/apiRouter");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "route not found" });
});

app.use((err, req, res, next) => {
  // console.log(err);
  let codeRef = {
    "22P02": { msg: "Invalid input for:" + err.input, status: 400 },
    "22003": { msg: "Too Large an int:" + err.input, status: 400 },
    "23502": { msg: "Invalid body for:" + err.inputBody, status: 400 },
    "23503": {
      msg: "Article_id is not found in the database:" + err.input,
      status: 404
    },
    "42703": { msg: `column "${err.sort_by}" does not exist`, status: 400 }
  };

  let statusRef = {
    "22P02": 400,
    "22003": 400,
    "23503": 404,
    "23503": 404
  };
  if (err.code)
    res.status(codeRef[err.code].status).send({ msg: codeRef[err.code].msg });
  else res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
