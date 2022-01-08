const global_data = require('../auth/global_data');
const auth = require('../auth/get_auth');

const Student = require('../models/Student');
const departments = new Set(global_data.all_departments);
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


exports.signin = async (req, res) => {

    try {

        var student = req.student;

        var { department, batch, presentYear } = await get_user_department_batch_presentYear(student.usn);
        student.department = department;
        student.batch = batch;
        student.presentYear = presentYear;
        
        // res.render("verify.ejs", { is_achievement_updated: null, student: student });
        res.status(200).json({ is_achievement_updated: null, userData: student });

    } catch (error) {
        console.log(error);
        // res.render("index.ejs", { isValid: false, error: error });
        res.status(401).json({ error: "Invalid Credentials 2" });
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

        var updated_student = await Student.findOneAndUpdate({ email: student.email }, { spreadsheetId }, { new: true });

        student.spreadsheetId = updated_student.spreadsheetId; // coz we have access token and refresh token in the old student
        student.department = department;
        student.batch = batch;
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