// class Admin {
//     constructor() {

//         this.name = null;
//         this.image = null;
//         this.email = null;

//     }
// }

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

    name: { type: String, default: null },
    image: { type: String, default: null },
    email: { type: String, unique: true },

    token: { type: String },
    refreshToken: { type: String }
});

module.exports = mongoose.model("Admin", adminSchema);

// module.exports = Admin;