const express = require("express");
const studentAuthRouter = require("./studentAuthRouter");
const studentRouter = require("./studentRouter");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use("/auth/student", studentAuthRouter);

router.use("/student", studentRouter);

router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});  

module.exports = router;