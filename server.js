/* Imports */
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

/* Routes */
app.use("/", require("./routes/root"));
app.use("/api/login", require("./routes/api/auth"));
app.use("/api/register", require("./routes/api/register"));
app.use("/api/refresh", require("./routes/api/refresh"));
app.use("/api/logout", require("./routes/api/logout"));

app.use(verifyJWT);
app.use("/api/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
