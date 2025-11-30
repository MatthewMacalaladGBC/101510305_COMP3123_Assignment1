require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const connectDB = require("./db");
const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeeRoutes");

connectDB().then(() => {
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
      console.log("Web server is running at port " + PORT);
  });
});

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000", // Local
    "https://one01510305-comp3123-assignment2.onrender.com" // Render Deploy
  ],
  credentials: true
}

));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/emp", employeeRouter);

app.get("/", (req, res) => {
  res.send({ message: "Default route testing" });
});