const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const mainRouter = require("./routes/mainRouter");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
connectDB();
app.use("/api/v1", mainRouter);
const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
