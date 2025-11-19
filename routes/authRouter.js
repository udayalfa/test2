const express = require("express");
const { login, register, logout, verify } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login",login);

authRouter.post("/register",register);

authRouter.get("/logout",logout);

authRouter.get("/verify",verify);

module.exports = authRouter;
