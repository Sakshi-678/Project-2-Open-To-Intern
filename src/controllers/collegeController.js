const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const ObjectId = mongoose.Types.ObjectId

const createColleges = async function (req, res) {
    const isValid = function(value) {
        if(typeof value === 'undefined' || value === null) return false
        if(typeof value === 'string' && value.trim().length === 0) return false
        return true;
    }
    const isValidRequestBody = function(requestBody) {
        return Object.keys(requestBody).length > 0
    }


    try {
        const requestBody = req.body;

        if(!isValidRequestBody(requestBody)) {
            res.status(400).send({status: false, message: 'Invalid request parameters. Please provide college details'})
            return
        }

        // Extract params
        const {name, fullName, logo } = requestBody;


        // Validation starts
        if(!isValid(name)) {
            res.status(400).send({status: false, message: 'Name is required'})
            return
        }


        if(!isValid(fullName)) {
            res.status(400).send({status: false, message: 'fullName is required'})
            return
        }


        if(!isValid(logo)) {
            res.status(400).send({status: false, message: 'logo is required'})
            return
        }

        const collegeData = {
            name,
            fullName,
            logo
        }
        

        let data = await collegeModel.create(collegeData);
        res.status(201).send({ status: true, data: data })
    }
    catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

module.exports.createColleges = createColleges;
