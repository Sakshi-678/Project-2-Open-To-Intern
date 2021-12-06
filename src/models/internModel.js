const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({

    name: {

        type: String,

        required: 'First name is required',

        trim: true,

    },

    email: {

        type: String,

        trim: true,

        lowercase: true,

        unique: true,

        required: 'Email address is required',

        validate: {

            validator: function (email) {

                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            }, message: 'Please fill a valid email address', isAsync: false

        }

    },

    mobile: {

        type: Number,

        required: 'phone number is required',

        unique: true,

        validate: {

            validator: function (number) {

                return /^[0]?[789]\d{9}$/.test(number);

            }, message: 'Please fill a valid number', isAsync: false

        }

    },


    isDeleted: {

        type: Boolean,

        default: false

    },

    collegeId: {

        required: 'collegeId  is required',

        type: mongoose.Types.ObjectId

    },





}, { timestamps: true })



module.exports = mongoose.model('Intern', internSchema)