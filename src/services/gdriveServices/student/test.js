import { sheets } from "@googleapis/sheets"
import add_achievement_to_departmentBatch from "./add_achievement_to_departmentBatch.js";
import add_student_to_departmentBatch from "./add_student_to_departmentBatch.js";
import get_student_achievements_of_departmentBatch from "./get_student_achievements_of_departmentBatch.js";
import is_student_in_departmentBatch from "./is_student_in_departmentBatch.js";
import Student from "./../../../interfaces/Student.js";
import Achievement from "./../../../interfaces/Achievement.js";



async function add_student_to_departmentBatch_test(user, departmentBatch) {
    const student = new Student(user);
    await add_student_to_departmentBatch(sheets, student, departmentBatch);
}

async function add_achievement_to_departmentBatch_test(user, achievement_sheets_admin_credentials, achievementDetails, departmentBatch) {
    const achievement = new Achievement(user, achievementDetails);
    await add_achievement_to_departmentBatch(sheets, achievement_sheets_admin_credentials, achievement, departmentBatch);
}

async function get_student_achievements_of_departmentBatch_test(user, departmentBatch) {
    const student = new Student(user);
    const achievements = await get_student_achievements_of_departmentBatch(sheets, student, departmentBatch);
    console.log(achievements);
}

async function is_student_in_departmentBatch_test(user, departmentBatch) {
    const fakeUser = {
        email : "hahahahah"
    }
    const student = new Student(user);
    const fakeStudent = new Student(fakeUser);
    const result = await is_student_in_departmentBatch(sheets, student, departmentBatch);
    console.log(result);
}

async function main() {

    const user1 = {
        name : "deven",
        email : "devenparamaj.is19@bmsce.ac.in",
        usn : "1BM19IS048",
        phone : "1234567890"
    };

    const user2 = {
        name : "arp",
        email : "arp.is19@bmsce.ac.in",
        usn : "1BM19IS020",
        phone : "1234567890"
    };

    const user3 = {
        name : "aaa",
        email : "aaa.is19@bmsce.ac.in",
        usn : "1BM19IS015",
        phone : "1234567890"
    };

    const achievementDetails1 = {
        nameOfEvent : "ABC",
        detailsOfEvent : "DEF",
        level : "state",
        award : "yes",
        certificateUrl : "https://google.com",
        yearOfAchievement : 1
    };

    const achievementDetails2 = {
        nameOfEvent : "ABC",
        detailsOfEvent : "DEF",
        level : "state",
        award : "yes",
        certificateUrl : "https://google.com",
        yearOfAchievement : 2
    };

    const achievementDetails3 = {
        nameOfEvent : "ABC",
        detailsOfEvent : "DEF",
        level : "state",
        award : "yes",
        certificateUrl : "https://google.com",
        yearOfAchievement : 3
    };

    const achievementDetails4 = {
        nameOfEvent : "ABC",
        detailsOfEvent : "DEF",
        level : "state",
        award : "yes",
        certificateUrl : "https://google.com",
        yearOfAchievement : 4
    };

    const departmentBatch = {
        achievementsSpreadsheetId: "1N18L-zp9c6pOHGyMvgjcKqWnGTO_ulLHnrYpza_qH84" //CS 2018 
        // achievementsSpreadsheetId: "1zIIQab1ZPiEmF-V3SFXOFqk_CyoSZHRqETkS1QTBWCc" //IS 2018
        // achievementsSpreadsheetId: "1iJRi8umXh7Wv28_Z49qOm0CY5OmFKDT4O6oTTdkuIBc" //IS 2019
        // achievementsSpreadsheetId: "1J-QUMrfchVJ3Q91hUUmzk_5v-2r28NsL1s34wtbhpQQ" //CS 2019
        
    }


    await add_student_to_departmentBatch_test(user1, departmentBatch);
    await add_student_to_departmentBatch_test(user2, departmentBatch);
    await add_student_to_departmentBatch_test(user3, departmentBatch);

    await add_achievement_to_departmentBatch_test(user1, process.env.achievement_sheets_admin1_credentials, achievementDetails1, departmentBatch);
    await add_achievement_to_departmentBatch_test(user2, process.env.achievement_sheets_admin2_credentials, achievementDetails2, departmentBatch);
    await add_achievement_to_departmentBatch_test(user1, process.env.achievement_sheets_admin3_credentials, achievementDetails2, departmentBatch);
    await add_achievement_to_departmentBatch_test(user3, process.env.achievement_sheets_admin1_credentials, achievementDetails1, departmentBatch);
    await add_achievement_to_departmentBatch_test(user2, process.env.achievement_sheets_admin3_credentials, achievementDetails3, departmentBatch);

    // await get_student_achievements_of_departmentBatch_test(user, departmentBatch);
    // await is_student_in_departmentBatch_test(user, departmentBatch);
}

main();