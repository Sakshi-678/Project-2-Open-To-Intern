const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var validateNumber = number.value
if (/^\d{10}$/.test(val)) {
} else {
    alert("Invalid number; must be ten digits")
    number.focus()
    return false
};

const internSchema = new mongoose.Schema({
    isDeleted: { type: Boolean, default: false },
    name: { type: String, required: "name is required" },

    email: {
        type: String, trim: true, lowercase: true, unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address']
    },
    mobile: {
        type: Number,
        validate: [validateNumber, 'please provide valid mobileNumber'],
        required: "mobile'number  is required "
    },
    collegeId: { type: ObjectId, ref: 'myCollege', required: true },

    publishedAt: { type: Date }
});
module.exports = mongoose.model('myIntern', internSchema)