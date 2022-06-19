const express = require("express");
const authRouter = require("./auth");
const studentRouter = require("./studentRouter");
const adminRouter = require("./adminRouter");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use("/auth", authRouter);

router.use("/student", studentRouter);

router.use("/admin", adminRouter);

router.post("/welcome", auth, (req, res) => {
    return res.status(200).send("Welcome 🙌 ");
});  

module.exports = router;