const express = require("express");
const router = express.Router();
// const { connectionMYSQL } = require("./connections/connection");
const { connectionBclMYSQL } = require("./connections/connection");

// const authenticationRouter = require("./routers/authentication");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/authRoutes");

// global.config = require("./jwt/config/config");
router.use("/auth", authRouter);
// router.use("/authentication", authenticationRouter);
router.use("/users", usersRouter);

//  connectionBclMYSQL connection check
router.get("/connection_check", (req, res) => {
  try {
    // This is for Pool connect
    connectionBclMYSQL.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        return res.send({
          message: "Connection create fail",
          error: err,
          "api v": 1,
        });
      }

      connection.release();
      return res.send({
        message: "Connection create success ",
        "api v": 1,
        precess: connectionBclMYSQL._acquiringConnections.length,
        length: connectionBclMYSQL._allConnections.length,
      });
    });
  } catch (error) {
    return res.status(400).send({
      status: 404,
      message: "Connection create fail try",
      "api v": 1,
      error: error,
    });
  }
});

module.exports = router;
