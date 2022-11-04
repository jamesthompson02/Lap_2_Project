const express = require("express");
const server = express();
const cors = require("cors");

const streak = require('./streak-config')
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const habitRouter = require("./routes/habit");

server.use(cors("*"));
server.use(express.json());

server.use("/auth", authRouter);
server.use("/api", habitRouter);

server.get("/", (req, res) => res.json({ message: "Welcome" }));

module.exports = { server, connectDB };
