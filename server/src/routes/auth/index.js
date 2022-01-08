const express = require("express");
const studentAuthRouter = require("./studentAuthRouter");
const router = express.Router();

router.use("/student", studentAuthRouter);

// router.use("/admin", adminAuthRouter);

module.exports = router;