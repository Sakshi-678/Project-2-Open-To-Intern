const collegeModel = require('../models/collegeModel')

const createColleges = async function (req, res) {
    try {
        let body = req.body;
        let data = await collegeModel.create(body);
        res.status(201).send({ status: true, data: data })
    }
    catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

module.exports.createColleges = createColleges;
