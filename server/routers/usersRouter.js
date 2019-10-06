const usersRouter = require("express").Router();
const { getusersByUsername } = require("../controllers/usersController");
const invalidMethod = require("./invalidMethod");

usersRouter.get("/:username", getusersByUsername);
usersRouter.all("/:username", invalidMethod);

module.exports = usersRouter;
