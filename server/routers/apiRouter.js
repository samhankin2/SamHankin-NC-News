const apiRouter = require("express").Router();
const articlesRouter = require("./articlesRouter");

const commentsRouter = require("./commentsRouter");
const topicsRouter = require("./topicsRouter");

const usersRouter = require("./usersRouter");

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.get("/", (req, res) => {
  console.log("test");
});

module.exports = apiRouter;
