require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db");
const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeeRoutes");

connectDB();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

app.get("/", (req, res) => {
  res.send({ message: "Default route testing" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Web server is running at port " + PORT);
});