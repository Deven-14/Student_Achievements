class Achievement {

    constructor({usn, name, email} = {}, {nameOfEvent, detailsOfEvent, level, award, certificateUrl = "None", yearOfAchievement} = {}) {

        this.usn = usn;
        this.name = name;
        this.email = email;
        this.nameOfEvent = nameOfEvent;
        this.detailsOfEvent = detailsOfEvent;
        this.level = level;
        this.award = award;
        this.certificateUrl = certificateUrl; // certificateUrl is be automatically undefined if it is not there in the object
        this.yearOfAchievement = yearOfAchievement;

    }

    static make(achievementArray, yearOfAchievement) {

        const achievement = new Achievement();

        achievement.usn = achievementArray[0];
        achievement.name = achievementArray[1];
        achievement.email = achievementArray[2];
        achievement.nameOfEvent = achievementArray[3];
        achievement.detailsOfEvent = achievementArray[4];
        achievement.level = achievementArray[5];
        achievement.award = achievementArray[6];
        achievement.certificateUrl = achievementArray[7];
        achievement.yearOfAchievement = yearOfAchievement;

        return achievement;
        
    }
    
}

// console.log(Achievement.make(1, [0, 1, 2, 3, 4, 5, 6, 7]).level);

export default Achievement;