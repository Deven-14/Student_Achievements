const express = require("express");
const global_data = require('../auth/global_data');
const auth = require('../auth/get_auth');

const Admin = require('../models/Admin');
const get_batches = require("../helpers/get_batches");
const view_achievements = require('../services/data_viewers/view_achievements');

const fs = require('fs');
const write_to_excel = require('../services/data_viewers/write_to_excel');

const router = express.Router();
router.departments = global_data.all_departments;


router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.post("/verify", async (req, res) => {
// async function verify(req, res, next) {
    try {

        var userData = new Admin();

        userData.name = req.body.name;
        userData.email = req.body.email;
        userData.image = req.body.image;
        // await is_lecturer(userData.email);
        router.all_batches = await get_batches(auth, global_data.index_table_id);
        // res.render("verify_lecturer.ejs", { userData: userData });
        res.send({ userData: userData });
    
    } catch (error) {
        console.log(error);
        // res.render("index.ejs", { error: 'Not a lecturer' });
        res.send({ error: 'Not a lecturer' });
    }
});


router.post("/studentAchievements", async (req, res) => {
    try {

        var userData = req.body.userData;
        var selected_departments = req.body.selected_departments;
        if (!Array.isArray(selected_departments)) {
            selected_departments = [req.body.selected_departments];
        }

        var selected_batches = req.body.selected_batches;
        if (!Array.isArray(selected_batches)) {
            selected_batches = [req.body.selected_batches];
        }

        var start_academic_year = parseInt(req.body.from_year);
        var end_academic_year = parseInt(req.body.to_year);
        var data = null;
        var download = false;

        if (selected_departments && selected_batches && start_academic_year && end_academic_year) {
            data = await view_achievements(auth, selected_departments, selected_batches, start_academic_year, end_academic_year);
            download = true;
        }

        // res.render("studentAchievements.ejs", { userData: userData, all_batches: router.all_batches, departments: router.departments, download: download, data: data });
        res.send({ userData: userData, all_batches: router.all_batches, departments: router.departments, download: download, data: data });

    } catch (error) {
        console.log(error);
        // res.render("studentAchievements.ejs", { userData: userData, all_batches: router.all_batches, departments: router.departments, download: false, data: null });
        res.send({ userData: userData, all_batches: router.all_batches, departments: router.departments, download: false, data: null, error: error });
    
    }

});

router.post('/downloadAchievements', async (req, res) => {

    var data = req.body.data;
    var filepath = `./temp/${Date.now()}.xlsx`;

    await write_to_excel(filepath, data);
    res.download(filepath, "student_achievements.xlsx", (err) => {
        if (err)
            console.log("file download error");
        else {
            //console.log("downloaded");
            fs.unlink(filepath, (err) => {
                //console.log("file deleted");
            });
        }
    });

});

module.exports = router;