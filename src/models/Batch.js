import { Schema, model } from "mongoose"

const batchSchema = new Schema({

    department: { type: String },
    fromYear: { type: Number, integer: true },
    toYear: { type: Number, integer: true },
    folderId: { type: String },
    spreadsheetId: { type: String },
    certificatesFolderId: { type: String }

});

export default model("Batch", batchSchema);