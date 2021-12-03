const mongoose = require("mongoose");


const collegeSchema = new mongoose.Schema({

    name: { type: String, required: "name is mendatory" , trim: true, unique: true, },

    fullName: { type: String,  trim: true,required: "fullName is mendatory " },

    logo: { type: String, required: true },

    isDeleted: { type: Boolean, default: false },

}, { timestamps: true })

module.exports = mongoose.model('myCollege', collegeSchema)
 