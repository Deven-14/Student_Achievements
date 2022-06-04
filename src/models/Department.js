import mongoose from "mongoose"
const { Schema, model } = mongoose;

const departmentSchema = new Schema({

    name: { type: String },
    code: { type: String, unique: true },
    folderId: { type: String, unique: true }
    
}); // TODO: add required: true for which have to be there when creating the department

export default model("Department", departmentSchema);