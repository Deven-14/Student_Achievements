class Achievement {
    constructor(yearOfAchievement, achievementArray) {

        this.usn = achievementArray[0];
        this.name = achievementArray[1];
        this.email = achievementArray[2];
        this.nameOfEvent = achievementArray[3];
        this.detailsOfEvent = achievementArray[4];
        this.level = achievementArray[5];
        this.award = achievementArray[6];
        this.certificate = achievementArray[7];
        this.yearOfAchievement = yearOfAchievement;
        
    }
}

module.exports = Achievement;