import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    subject: {type: String, required:true},
    value: {type: Number, required:true}
})

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    grades:[gradeSchema]
})

export const studentModel = mongoose.model('Student',studentSchema)
