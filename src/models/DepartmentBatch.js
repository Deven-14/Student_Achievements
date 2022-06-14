import mongoose from "mongoose"
const { Schema, model } = mongoose;

const DepartmentBatchSchema = new Schema({

    departmentCode: { type: String, reqired: true },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch', reqired: true },
    folderId: { type: String, unique: true, reqired: true },
    achievementsSpreadsheetId: { type: String, unique: true, reqired: true },
    certificatesFolderId: { type: String, unique: true, reqired: true }

}); // TODO: add required: true for which have to be there when creating the department

export default model("DepartmentBatch", DepartmentBatchSchema);