const express = require("express");
const { studentAchievements, downloadAchievements, createBatch } = require("../controllers/adminServiceController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/studentAchievements", auth, studentAchievements);

router.get("/studentAchievements/download", auth, downloadAchievements);

router.post("/createBatch", auth, createBatch);

module.exports = router;