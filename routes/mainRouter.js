const express = require("express")
const authRouter = require("./authRouter")
const { default: jewellaryRouter } = require("./jewellaryRouter")
const { default: contactRouter } = require("./contactRouter")

const mainRouter = express.Router()

mainRouter.use("/auth",authRouter)
mainRouter.use("/jewellary",jewellaryRouter)
mainRouter.use("/contact",contactRouter)


module.exports = mainRouter