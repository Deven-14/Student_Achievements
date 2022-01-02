const express = require('express');
const auth = require('../auth/get_auth');

const Student = require('../models/Student');
const get_spreadsheetId = require("../helpers/get_spreadsheet_id");
const get_user_department_batch_presentYear = require('../services/data_collectors/get_user_department_batch_presentYear');
const get_registered_user = require('../services/data_collectors/get_registered_user');

const router = express.Router();


router.post("/login", async (req, res) => {

    try {
        var userData = new Student();

        userData.name = req.body.name;
        userData.email = req.body.email;
        userData.image = req.body.image;
        userData.usn = req.body.usn;

        var data = await get_user_department_batch_presentYear(userData.usn);
        userData.department = data.department;
        userData.batch = data.batch;
        userData.presentYear = data.presentYear;

        userData.spreadsheetId = await get_spreadsheetId(auth, userData.department, userData.batch);

        var user = await get_registered_user(auth, userData.spreadsheetId, userData.email);

        if (!user)
            throw new Error("User Not Registered");

        if (user.usn.localeCompare(userData.usn) != 0)
            throw new Error("Entered Wrong USN");
        
        userData.phone = user.phone;

        // res.render("verify.ejs", { is_achievement_updated: null, userData: userData });
        res.send({ is_achievement_updated: null, userData: userData });

    } catch (error) {
        console.log(error);
        // res.render("index.ejs", { isValid: false, error: error });
        res.send({ isValid: false, error: error });
    }

});


module.exports = router;