const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const noteRoutes = require("./routes/note");
const authRoutes = require("./routes/userRoutes");
dotenv.config();
mongoose.connect(process.env.DB_URL, () => console.log("mongoose connected"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", authRoutes);

app.use("/api/notes", noteRoutes);
app.get("/", (req, res) => {
  res.send(req.body);
});
app.listen(8000, () => console.log("Server connected"));
