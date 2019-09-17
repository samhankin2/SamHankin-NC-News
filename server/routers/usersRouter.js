const usersRouter = require("express").Router();
const { getusersByUsername } = require("../controllers/usersController");

usersRouter.get("/:username", getusersByUsername);

module.exports = usersRouter;
