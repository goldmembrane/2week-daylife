const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/users");

const morgan = require("morgan");

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Success");
});

app.use("/users", userRouter);

app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`app is listening in PORT ${app.get("port")}`);
});

module.exports = app;
