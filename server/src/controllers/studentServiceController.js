const global_data = require('../auth/global_data');
const auth = require('../auth/get_auth');

const Student = require('../models/Student');
const departments = new Set(global_data.all_departments);
const get_spreadsheetId = require("../helpers/get_spreadsheet_id");
const get_user_department_batch_presentYear = require('../services/data_collectors/get_user_department_batch_presentYear');
const get_registered_user = require('../services/data_collectors/get_registered_user');
const get_student_presentYear = require("../helpers/get_student_presentYear");

const validate_ph_number = require('../helpers/validate_ph_number');
const isBatchPresent = require("../helpers/isBatchPresent");
const add_user = require('../services/data_collectors/add_user');

const add_achievement = require('../services/data_collectors/add_achievement');
const add_file_to_temp = require('../helpers/add_file_to_temp');
const upload_certificate = require('../helpers/upload_certificate');
const fs = require('fs');
const get_achievements = require('../services/data_collectors/get_achievements');


exports.signin = async (req, res) => {

    try {

        var student = req.student;

        var presentYear = await get_student_presentYear(student.usn);
        student.presentYear = presentYear;
        
        // res.render("verify.ejs", { is_achievement_updated: null, student: student });
        res.status(200).json({ is_achievement_updated: null, userData: student });

    } catch (error) {
        console.log(error);
        // res.render("index.ejs", { isValid: false, error: error });
        res.status(401).json({ error: "Invalid Credentials" });
        // res.send({ isValid: false, error: error });
    }

}

exports.signup = async (req, res) => {

    try {

        var student = req.student;

        var { department, batch, presentYear } = await get_user_department_batch_presentYear(student.usn);
        
        var spreadsheetId = await get_spreadsheetId(auth, department, batch);

        await validate_ph_number(student.phone);

        if (!departments.has(department)) {
            throw new Error("Invalid department");
        }

        var isPresent = await isBatchPresent(auth, global_data.index_table_id, batch);
        if (isPresent == false) {
            throw new Error("Invalid batch");
        }

        var updated_student = await Student.findOneAndUpdate({ email: student.email }, { spreadsheetId, department, batch }, { new: true });

        student.spreadsheetId = updated_student.spreadsheetId; // coz we have access token and refresh token in the old student
        student.department = updated_student.department;
        student.batch = updated_student.batch;
        student.presentYear = presentYear;

        await add_user(auth, student);

        // res.render("verify.ejs", { is_achievement_updated: null, student: student });
        res.status(201).json({ is_achievement_updated: null, userData: student });

    } catch (error) {
        console.log(error);
        await Student.findOneAndDelete({ email: student.email });
        // res.render("index.ejs", { isValid: false, error: error })
        res.status(401).json({ error: "Invalid Credentials" });
        // res.send({ isValid: false, error: error });
    }
}


exports.addAchievement = async (req, res) => {

    try {

        var { email } = req.user;
        email = email.toLowerCase(); // sanitize: convert email to lowercase

        const student = await Student.findOne({ email });
        var presentYear = await get_student_presentYear(student.usn);
        student.presentYear = presentYear;

        student.nameOfEvent = req.body.nameOfEvent;
        student.detailsOfEvent = req.body.detailsOfEvent;
        student.award = req.body.award;
        student.level = req.body.level;
        student.yearOfAchievement = parseInt(req.body.yearOfAchievement);

        if(!student.nameOfEvent || !student.detailsOfEvent || !student.award || !student.level || !student.yearOfAchievement) {
            throw new Error("Data Missing");
        }

        student.certificate = "None";
        if(req.files && req.files.certificate) {

            var file = req.files.certificate;
            var filename = `${Date.now()}.pdf`;
            var filepath = await add_file_to_temp(file, filename);
            student.certificate = await upload_certificate(auth, filepath, student.email);
            fs.unlink(filepath, (err) => {
                // console.log("file deleted");
            });

        } else {
            // console.log("no certificate");
        }

        await add_achievement(auth, student);
        // student.certificate = "None"; // so that the same certificate doesn't get attached for the next achievement for which they didn't add certificate

        // res.render("verify.ejs", { is_achievement_updated: true, student: student });
        res.status(201).json({ is_achievement_updated: true });    

    } catch (error) {
        console.log(error);
        // res.render("verify.ejs", { is_achievement_updated: false, student: student });
        // res.send({ is_achievement_updated: false, student: student, error: error });
        res.status(401).json({ is_achievement_updated: false, error: "Invalid Data" });
    }
}


exports.viewAchievements = async (req, res) => {

    try {

        var { email } = req.user;
        email = email.toLowerCase(); // sanitize: convert email to lowercase

        const student = await Student.findOne({ email });
        var presentYear = await get_student_presentYear(student.usn);
        student.presentYear = presentYear;

        const achievements = await get_achievements(auth, student);
        // res.render("viewAchievements.ejs", { isValid: true, userData: userData, achievements: data });
        // res.send({ isValid: true, achievements: data });
        res.status(200).json({ isValid: true, achievements });
        
    } catch (error) {
        console.log(error);
        // res.render("verify.ejs", { is_achievement_updated: null, userData: userData });
        // res.send({ is_achievement_updated: null, error: error});
        res.status(500).json({ is_achievement_updated: null, error: "Internal Server Error" });
    }
}