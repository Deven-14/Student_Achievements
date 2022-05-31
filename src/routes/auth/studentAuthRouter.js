const express = require("express");
const { register, login, refreshToken } = require("../../controllers/studentAuthController");
const { signin, signup } = require("../../controllers/studentServiceController");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/signup", register, signup);

router.post("/signin", login, signin);

router.post("/refreshToken", refreshToken);

module.exports = router;