const global_data = require('../auth/global_data');
const auth = require('../auth/get_auth');

const Admin = require('../models/Admin');
const view_achievements = require('../services/data_viewers/view_achievements');

const fs = require('fs');
const write_to_excel = require('../services/data_viewers/write_to_excel');


exports.studentAchievements = async (req, res) => {

    try {

        // const { email } = req.user;

        var selected_departments = req.query.selected_departments;
        if (!Array.isArray(selected_departments)) {
            selected_departments = [req.query.selected_departments];
        }

        var selected_batches = req.query.selected_batches;
        if (!Array.isArray(selected_batches)) {
            selected_batches = [req.query.selected_batches];
        }

        var start_academic_year = parseInt(req.query.from_year);
        var end_academic_year = parseInt(req.query.to_year);
        var data = null;
        var download = false;

        if (selected_departments && selected_batches && start_academic_year && end_academic_year) {
            data = await view_achievements(auth, selected_departments, selected_batches, start_academic_year, end_academic_year);
            download = true;
        }

        // res.render("studentAchievements.ejs", { userData: userData, all_batches: router.all_batches, departments: router.departments, download: download, data: data });
        res.status(200).json({ download: download, data: data });

    } catch (error) {
        console.log(error);
        // res.render("studentAchievements.ejs", { userData: userData, all_batches: router.all_batches, departments: router.departments, download: false, data: null });
        res.status(500).json({ download: false, data: null, error: "Internal Server Error" });
    
    }

}


exports.downloadAchievements = async (req, res) => {

    var data = req.body.data;
    var filepath = `./temp/${Date.now()}.xlsx`;

    await write_to_excel(filepath, data);
    res.download(filepath, "student_achievements.xlsx", (err) => {
        if (err) {
            console.log("file download error");
        } else {
            //console.log("downloaded");
            fs.unlink(filepath, (err) => {
                //console.log("file deleted");
            });
        }
    });

}


exports.createBatch = async (req, res) => {

    if (req.body.batch_year && req.body.batch_year.localeCompare("NaN") != 0) {

        try {

            var batch_year = parseInt(req.body.batch_year);
            await create_batch(batch_year);
            var all_batches = await get_batches(auth, global_data.index_table_id);
            console.log("createBatches : all batches", all_batches);
            return res.status(200).json({ all_batches });

        } catch (error) {
            console.log("CONTACT THE DEVELOPER", error);
            return res.status(500).json({ error: "Internal Server Error" });
        } 

    } else {
        return res.status(401).json({ error: "Invalid Batch" });
    }
    // res.render('createBatches.ejs', { userData: userData, all_batches: app.locals.all_batches });   
}