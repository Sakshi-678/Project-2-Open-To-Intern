const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const create = async function (req, res) {
    try {
        
    }
    catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

module.exports.create = create;



