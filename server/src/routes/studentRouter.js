const express = require("express");
const { addAchievement, viewAchievements } = require("../controllers/studentServiceController");
const auth = require("../middlewares/auth");
const fileUpload = require('express-fileupload');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// router.post("/signup", register, signup);

// router.post("/signin", login, signin);

router.use(fileUpload());
router.post("/addAchievement", auth, addAchievement);

router.get("/viewAchievements", auth, viewAchievements);

module.exports = router;