require("dotenv").config();

const express = require("express");
const connectDB = require("./config/mongo");
const authRoutes = require("./Route/Authentication");
const userRoutes = require("./Route/userR");




const app = express();
app.use(express.json());

connectDB();




// routes
app.use("/auth", authRoutes);
// app.use("/api/user", userRoutes);





app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log("Server running")
);
