class Admin {
    constructor({name, email} = {}) {

        this.name = name;
        this.email = email;

    }
}

// console.log(new Admin());

export default Admin;

// import { Schema, model } from "mongoose";

// const adminSchema = new Schema({

//     name: { type: String, default: null },
//     email: { type: String, unique: true },
//     image: { type: String },

//     // token: { type: String },
//     // refreshToken: { type: String }

// });

// export default model("Admin", adminSchema);