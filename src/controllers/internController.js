const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')

// creating college

const createIntern = async function (req, res) {
    const isValid = function (value) {
        if (typeof value === 'undefined' || value === null) return false
        if (typeof value === 'string' && value.trim().length === 0) return false
        return true;
    }
    
    const isValidRequestBody = function (requestBody) {
        return Object.keys(requestBody).length > 0
    }

    const regexMobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })
            return
        }

        //extract params

        const { name, email, mobile, collegeName } = requestBody;

        //validation starts

        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid name' })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid email' })
            return
        }
        if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({status: false, message: `Email should be a valid email address`})
            return
        }

        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid mobile' })
            return
        }

        if(!(regexMobile.test(mobile))){
            res.status(400).send({status: false, message: `number should be valid `})
            return
        }


        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid collegeName' })
            return
        }

        const isNumberAlreadyUsed = await InternModel.findOne({mobile}); 

        if(isNumberAlreadyUsed) {
            res.status(400).send({status: false, message: `${mobile} number is already registered`})
            return
        }

        const isEmailAlreadyUsed = await InternModel.findOne({email}); 

        if(isEmailAlreadyUsed) {
            res.status(400).send({status: false, message: `${email} email is already registered`})
            return
        }

        //validation ends
        let nm = req.body.collegeName;
        const collegeData = await CollegeModel.findOne({name: nm })

        if(!collegeData){
            res.status(400).send({status: false, message: `${nm} is not a valid college name`})
        }

        else{
            let collegeId = collegeData._id;
       
            req.body.collegeId = collegeId;
            
    
            const internData = {name, email, mobile, collegeName, collegeId}
        
            const createIntern = await InternModel.create(internData);
    
            res.status(201).send({ status: true, message: `Intern created successfully`, data: createIntern });
        }

       

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}



const getAllInterns = async function (req, res) {
    try {
        let tempcolgName = req.query.collegeName

        if(!tempcolgName){
            res.status(400).send({status: false, err: "College Name is required"})
        }
        let colgName = tempcolgName.toLowerCase()
        
        let temp = await CollegeModel.findOne({name : colgName})
        
        if (!temp){
            res.status(400).send({status : false , err: "Invalid parameters: Provide a valid college anabbreviation"})
        } 

        else{
            let ID = temp._id
            let data = temp
    
            let interns = await InternModel.find({collegeId: ID}).select({_id: 1, name:1,email: 1, mobile: 1})
    
            if (!interns){
                res.status(200).send({status : true , msg: "No Interns applied for an internship"})
            }
            
            else{
                
                let details = {name : data.name, fullname : data.fullName, logolink: data.logo, interests : interns}
            

                res.status(200).send({status: true, Details: details})
            }
            
        }
    }

    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}



module.exports.createIntern = createIntern;

module.exports.getAllInterns = getAllInterns;

