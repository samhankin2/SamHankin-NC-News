const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");

const invalidMethod = require("./invalidMethod");

topicsRouter.get("/", getTopics);
topicsRouter.all("/", invalidMethod);

module.exports = topicsRouter;
