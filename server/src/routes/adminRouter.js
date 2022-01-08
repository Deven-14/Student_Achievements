const express = require("express");
const { studentAchievements, downloadAchievements } = require("../controllers/adminServiceController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/studentAchievements", auth, studentAchievements);

router.get("/studentAchievements/download", auth, downloadAchievements);

module.exports = router;