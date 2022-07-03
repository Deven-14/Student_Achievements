import Student from "./Student.js";

class Achievement {

    constructor(student, {nameOfEvent, detailsOfEvent, level, award, certificateUrl = "None", yearOfAchievement} = {}) {

        this.student = student;
        this.nameOfEvent = nameOfEvent;
        this.detailsOfEvent = detailsOfEvent;
        this.level = level;
        this.award = award;
        this.certificateUrl = certificateUrl; // certificateUrl is be automatically undefined if it is not there in the object
        this.yearOfAchievement = yearOfAchievement;

    }

    static makeForStudent(achievementArray, yearOfAchievement) {

        const achievement = new Achievement();

        achievement.nameOfEvent = achievementArray[3];
        achievement.detailsOfEvent = achievementArray[4];
        achievement.level = achievementArray[5];
        achievement.award = achievementArray[6];
        achievement.certificateUrl = achievementArray[7];
        achievement.yearOfAchievement = yearOfAchievement;

        return achievement;
        
    }

    // static makeForAdmin(achievementArray) {

    //     const achievement = new Achievement();

    //     achievement.student = new Student({usn: achievementArray[0], name: achievementArray[1], email: achievementArray[2]});
    //     achievement.nameOfEvent = achievementArray[3];
    //     achievement.detailsOfEvent = achievementArray[4];
    //     achievement.level = achievementArray[5];
    //     achievement.award = achievementArray[6];
    //     achievement.certificateUrl = achievementArray[7];
    //     achievement.yearOfAchievement = achievementArray[8];
    //     achievement.departmentCode = achievementArray[9]; // extra fields, if we were storing in db then it would be required, here we are not storing this in the begining coz 
    //     achievement.batchName = achievementArray[10]; // we are putting it in a department folder and then inside a batch folder, we fetch these two details from these foldernames

    //     // student, departmentCode and batchName, these three fields would be used to identify Student, Department and Batch in the db

    //     return achievement;
        
    // }
    
}

// console.log(Achievement.make(1, [0, 1, 2, 3, 4, 5, 6, 7]).level);

export default Achievement;