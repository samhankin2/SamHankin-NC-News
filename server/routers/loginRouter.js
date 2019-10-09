const loginRouter = require("express").Router();
const { getUserPassword } = require("../controllers/loginController");
const invalidMethod = require("./invalidMethod");

loginRouter.post("/", getUserPassword);
loginRouter.all("/", invalidMethod);

module.exports = loginRouter;
