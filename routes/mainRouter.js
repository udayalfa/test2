const express = require("express")
const authRouter = require("./authRouter")

const mainRouter = express.Router()

mainRouter.use("/auth",authRouter)


module.exports = mainRouter