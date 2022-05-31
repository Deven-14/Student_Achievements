// class Student {
//     constructor() {

//         this.usn = null;
//         this.name = null;
//         this.image = null;
//         this.email = null;
//         this.phone = null;
//         this.nameOfEvent = null;
//         this.detailsOfEvent = null;
//         this.level = null;
//         this.award = null;
//         this.certificate = null;
//         this.department = null;
//         this.batch = null;
//         this.spreadsheetId = null;
//         this.presentYear = null;
//         this.yearOfAchievement = null;

//     }
// }


const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    usn: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, unique: true },
    phone: { type: String, default: null },
    spreadsheetId: { type: String, default: null },
    department: { type: String, default: null },
    batch: { type: String, default: null },

    nameOfEvent: { type: String },
    detailsOfEvent: { type: String },
    level: { type: String },
    award: { type: String },
    certificate: { type: String },
    presentYear: { type: Number, integer: true },
    yearOfAchievement: { type: Number, integer: true },

    token: { type: String },
    refreshToken: { type: String }

});

module.exports = mongoose.model("Student", studentSchema);

// module.exports = Student;