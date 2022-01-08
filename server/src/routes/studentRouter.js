const express = require("express");
const { signin, signup } = require("../controllers/studentServiceController");
// const { register, login } = require("../controllers/studentAuthController");
const router = express.Router();

// router.post("/signup", register, signup);

// router.post("/signin", login, signin);
router.get("/abc", (req, res) => {} );

module.exports = router;