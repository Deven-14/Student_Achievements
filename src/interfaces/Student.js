class Student {
    constructor({usn, name, email, phone} = {}) {

        this.usn = usn;
        this.name = name;
        this.email = email;
        this.phone = phone;

    }
}

export default Student;

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


// import { Schema, model } from "mongoose";
// import Batch from "./Batch";

// const studentSchema = new Schema({

//     usn: { type: String, default: null },
//     name: { type: String, default: null },
//     email: { type: String, unique: true },
//     phone: { type: String, default: null },
//     // spreadsheetId: { type: String, default: null },
//     // department: { type: String, default: null },
//     // batch: { type: String, default: null },
//     // batch: { type: Batch },

//     // nameOfEvent: { type: String },
//     // detailsOfEvent: { type: String },
//     // level: { type: String },
//     // award: { type: String },
//     // // certificate: { type: String },
//     // certificateLink: { type: String },
//     // presentYear: { type: Number, integer: true },
//     // yearOfAchievement: { type: Number, integer: true },

//     // token: { type: String },
//     // refreshToken: { type: String }

// });

// export default model("Student", studentSchema);