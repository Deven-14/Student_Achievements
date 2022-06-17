import mongoose from "mongoose"
const { Schema, model } = mongoose;

export const BatchSchema = new Schema({

    startYear: { type: Number, integer: true, unique: true, required: true },
    endYear: { type: Number, integer: true, unique: true, required: true },
    name: { type: String, unique: true, required: true}

}); // TODO: add required: true for which have to be there when creating the department

export default model("Batch", BatchSchema);