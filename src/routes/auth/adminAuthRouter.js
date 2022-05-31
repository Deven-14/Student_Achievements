const express = require("express");
const { verify, refreshToken } = require("../../controllers/adminAuthController");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/verify", verify);

router.post("/refreshToken", refreshToken);

module.exports = router;