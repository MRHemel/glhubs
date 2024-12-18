const express = require("express");
// const authRoutes = require("./routes/authRoutes");
// const authRoutes = require("./api/v1/routers/authRoutes");
const api_redirect_path = require("./api/api");
const dotenv = require("dotenv");
const cors = require("cors");
const api_version = 1.0;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your custom error handler for body parsing
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send({
      status: 400,
      message: "Error parsing data, request is not in a JSON format",
      success: false,
    });
  } else {
    next();
  }
});
// app.use("/api/auth", authRoutes);
app.use("/api", api_redirect_path);

app.get("/status-code", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "error status code",
    success: true,
    "api v": api_version,
    data: {
      result: [
        { code: 200, details: "Everything is fine" },
        { code: 201, details: "Everything is fine and resource is created" },
        { code: 304, details: "Resource is not modified" },
        { code: 400, details: "Bad request for request format" },
        {
          code: 401,
          details: "You are not authorized to access this resource",
        },
        { code: 403, details: "No access to this resource" },
        { code: 404, details: "Resource not found" },
        { code: 405, details: "Method is not goog" },
        { code: 409, details: "Duplicate entry error" },
        { code: 500, details: "Internal server error" },
        { code: 503, details: "Server is not available now" },
      ],
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(PORT, "0.0.0.0", async () => {
//   console.log(`Server running on port ${PORT}`);
// });
