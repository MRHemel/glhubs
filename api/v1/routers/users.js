const express = require("express");
const isEmpty = require("is-empty");
const userModel = require("../model/users");
const router = express.Router();
router.get("/list", async (req, res) => {
  let result = await userModel.getList();

  return res.status(200).send({
    success: true,
    status: 200,
    message: "User List",
    count: result.length,
    data: result,
  });
});

module.exports = router;
