const express = require('express');
const global_data = require('../auth/global_data');
const auth = require('../auth/get_auth');

const Student = require('../models/Student');
const get_spreadsheetId = require("../helpers/get_spreadsheet_id");
const get_user_department_batch_presentYear = require('../services/data_collectors/get_user_department_batch_presentYear');
const get_registered_user = require('../services/data_collectors/get_registered_user');

const validate_ph_number = require('../helpers/validate_ph_number');
const isBatchPresent = require("../helpers/isBatchPresent");
const add_user = require('../services/data_collectors/add_user');

const add_achievement = require('../services/data_collectors/add_achievement');
const add_file_to_temp = require('../helpers/add_file_to_temp');
const upload_certificate = require('../helpers/upload_certificate');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const get_achievements = require('../services/data_collectors/get_achievements');

const router = express.Router();
router.departments = new Set(global_data.all_departments);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/signin", async (req, res) => {

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

        if (!user) {
            throw new Error("User Not Registered");
        }

        if (user.usn.localeCompare(userData.usn) != 0) {
            throw new Error("Entered Wrong USN");
        }
        
        userData.phone = user.phone;

        // res.render("verify.ejs", { is_achievement_updated: null, userData: userData });
        res.send({ is_achievement_updated: null, userData: userData });

    } catch (error) {
        console.log(error);
        // res.render("index.ejs", { isValid: false, error: error });
        res.send({ isValid: false, error: error });
    }

});



// app.post("/getUserDetails", (req, res) => {

//     var userData = new UserDataObject();

//     userData.name = req.body.name;
//     userData.email = req.body.email;
//     userData.image = req.body.image;
//     res.render("getUserDetails.ejs", { userData: userData });
// });


router.post("/signup", async (req, res) => {
    try {

        // var userData = req.body.userData;
        var userData = new Student();

        userData.name = req.body.name;
        userData.email = req.body.email;
        userData.image = req.body.image;
        userData.usn = req.body.usn;
        userData.phone = req.body.phone;

        var data = await get_user_department_batch_presentYear(req.body.usn);
        userData.department = data.department;
        userData.batch = data.batch;
        userData.presentYear = data.presentYear;

        await validate_ph_number(userData.phone);

        // var departments_set = new Set(app.locals.departments)
        // if (!departments_set.has(userData.department)) {
        //     throw new Error("Invalid department");
        // }
        if (!router.departments.has(userData.department)) {
            throw new Error("Invalid department");
        }

        var isPresent = await isBatchPresent(auth, global_data.index_table_id, userData.batch);
        if (isPresent == false) {
            throw new Error("Invalid batch");
        }

        userData.spreadsheetId = await get_spreadsheetId(auth, userData.department, userData.batch);
        var user = await get_registered_user(auth, userData.spreadsheetId, userData.email);
        if (user) {
            throw new Error("User Already Registered");
        }

        await add_user(auth, userData);

        // res.render("verify.ejs", { is_achievement_updated: null, userData: userData });
        res.send({ is_achievement_updated: null, userData: userData });

    } catch (error) {
        console.log(error);
        // res.render("index.ejs", { isValid: false, error: error })
        res.send({ isValid: false, error: error });
    }
});

// router.post("/addAchievement", async (req, res) => {
//     try {

//         var userData = req.body.userData;
//         if (!userData.name || !userData.image || !userData.email || !userData.usn ||
//             !userData.phone || !userData.department || !userData.batch || !userData.presentYear)
//             throw new Error("Login Error");

//         var is_achievement_updated = null;
//         if (req.body.is_achievement_updated == "true")
//             is_achievement_updated = true;
//         else if (req.body.is_achievement_updated == "false")
//             is_achievement_updated = false;

//         // res.render("addAchievement.ejs", { is_achievement_updated: is_achievement_updated, userData: userData });
//         res.send({ is_achievement_updated: is_achievement_updated, userData: userData });
//     } catch (error) {
//         console.log(error);
//         // res.render("index.ejs", { isValid: false, error: error });
//         res.send({ isValid: false, error: error });
//     }
// });

router.use(fileUpload());
// router.post("/updating_achievement", async(req, res) => {
router.post("/addAchievement", async (req, res) => {

    try {

        var userData = req.body.userData;
        userData.nameOfEvent = req.body.nameOfEvent;
        userData.detailsOfEvent = req.body.detailsOfEvent;
        userData.award = req.body.award;
        userData.level = req.body.level;
        userData.yearOfAchievement = parseInt(req.body.year);

        userData.certificate = "None";
        if(req.files && req.files.certificate) {
            var file = req.files.certificate;
            var filename = `${Date.now()}.pdf`;
            var filepath = await add_file_to_temp(file, filename);
            userData.certificate = await upload_certificate(auth, filepath, userData.email);
            fs.unlink(filepath, (err) => {
                // console.log("file deleted");
            });
        } else {
            // console.log("no certificate");
        }

        for (let field in userData) {
            if (field != 'year1' && field != 'year2' && field != 'year3' && field != 'year4' && !userData[field]) {
                throw new Error("Invalid");
            }
        }

        await add_achievement(auth, userData);
        userData.certificate = "None"; // so that the same certificate doesn't get attached for the next achievement for which they didn't add certificate

        // res.render("verify.ejs", { is_achievement_updated: true, userData: userData });
        res.send({ is_achievement_updated: true, userData: userData });
    } catch (error) {
        console.log(error);
        // res.render("verify.ejs", { is_achievement_updated: false, userData: userData });
        res.send({ is_achievement_updated: false, userData: userData, error: error });
    }
});

router.post("/viewAchievements", async (req, res) => {
    try {
        var userData = req.body.userData;
        const data = await get_achievements(auth, userData);
        // res.render("viewAchievements.ejs", { isValid: true, userData: userData, achievements: data });
        res.send({ isValid: true, userData: userData, achievements: data });
    } catch (error) {
        console.log(error);
        // res.render("verify.ejs", { is_achievement_updated: null, userData: userData });
        res.send({ is_achievement_updated: null, userData: userData , error: error});
    }
});

module.exports = router;