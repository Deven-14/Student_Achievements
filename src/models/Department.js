import mongoose from "mongoose"
const { Schema, model } = mongoose;

const DepartmentSchema = new Schema({

    name: { type: String, reqired: true },
    code: { type: String, unique: true, reqired: true },
    folderId: { type: String, unique: true, reqired: true },
    batches: [{ type: Schema.Types.ObjectId, ref: 'DepartmentBatch' }]
    
}); // TODO: add required: true for which have to be there when creating the department

export default model("Department", DepartmentSchema);