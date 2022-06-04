import { Schema, model } from "mongoose"

const batchSchema = new Schema({

    departmentCode: { type: String },
    fromYear: { type: Number, integer: true },
    toYear: { type: Number, integer: true },
    folderId: { type: String, unique: true },
    spreadsheetId: { type: String, unique: true },
    certificatesFolderId: { type: String, unique: true }

}); // TODO: add required: true for which have to be there when creating the department

export default model("Batch", batchSchema);