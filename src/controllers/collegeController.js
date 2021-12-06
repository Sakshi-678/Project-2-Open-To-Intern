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

    const isAlpha = str => /^[a-zA-Z]*$/.test(str);
    
    try {

        const requestBody = req.body;
        let temp = requestBody.name
         
            if(!isValid(temp)) {
                res.status(400).send({status: false, message: 'Name is required'})
                return
            }
    
            else{
                // in case there is a spacing in collge abbreviation 
    
                let properspacing = temp.replace(/\s+/g, '') // this will remove all spacing by recursively/ constinously calling regex untill there is no space in b/w
                if (!isAlpha(properspacing)){
                    res.status(400).send({err: "Invalid request parameters-> Please provide valid college abbreviation. The abbreviation name should only contains alphabets. "})
                }

                else{
                    //in case the name is not in lower case 
                    Name = properspacing.toLowerCase()
        
                    requestBody.name = Name
                    if(!isValidRequestBody(requestBody)) {
                        res.status(400).send({status: false, message: 'Invalid request parameters. Please provide college details'})
                        return
                    }
        
                    // Extract params
                    const {name, fullName, logo } = requestBody;
        
        
                    // Validation starts
                    // WE ALREADY VALIDATED THE PRESENCE OF NAME ABOVE IN LINE 22
                    // if(!isValid(name)) {
                    //     res.status(400).send({status: false, message: 'Name is required'})
                    //     return
                    // }
        
        
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

            }

    }
    catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

module.exports.createColleges = createColleges;
