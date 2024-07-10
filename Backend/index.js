const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const messageRoute = require("./routes/message.routes.js");

const connection = require("./database.js");
connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/message", messageRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port:${PORT}`);
});

module.exports = app;
