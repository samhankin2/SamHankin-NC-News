const usersRouter = require("express").Router();
const {
  getusersByUsername,
  postNewUser
} = require("../controllers/usersController");
const invalidMethod = require("./invalidMethod");

usersRouter.get("/:username", getusersByUsername);
usersRouter.post("/", postNewUser);
usersRouter.all("/:username", invalidMethod);

module.exports = usersRouter;
