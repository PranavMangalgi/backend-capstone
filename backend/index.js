const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const port = process.env.PORT || 3000;
const connectDB = require("./connection");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api", authRoutes);
app.use("/jobs", jobRoutes);

app.get("/health", (req, res) => {
  const data = {
    serverName: "Week List Server",
    currentTime: new Date(),
    uptime: process.uptime(),
    status: "active",
  };
  res.status(200).json(data);
});

app.use((req, res, next) => {
  const err = new Error("NOT FOUND");
  err.status = 404;
  req.errorMessage = "Page not found";
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .send({ status: `ERROR`, message: err.message });
});

app.listen(port, () => {
  connectDB(process.env.MONGODB_URL)
    .then(() =>
      console.log(`DB connected, server running at http://localhost:${port}`)
    )
    .catch((e) => console.error(e));
});
