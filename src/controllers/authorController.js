const AuthorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')


const createAuthor = async function (req, res) {
    try{

        let body = req.body;
        let data = await AuthorModel.create(body);
        res.status(201).send({status: true, msg: data})

    }
    catch(err){

        res.status(400).send({msg: err.message})

    }
}

const login = async function (req, res) 
{
    let useremail = req.body.email
    let userpassword = req.body.password
    if (useremail && userpassword) 
    {
        let User = await AuthorModel.findOne({ email: useremail, password: userpassword, isDeleted: false })

        if (User) {
            const Token = jwt.sign({ userId: User._id }, "Group2")
            res.header('x-api-key', Token)
            res.status(200).send({ status: true })
        } else {
            res.status(401).send({ status: false, Msg: "Invalid Email or Password" })
        }
    }else {
        res.status(400).send({ status: false, msg: "request body must contain  email as well as password" })
    }
}

module.exports.createAuthor = createAuthor;
module.exports.login = login;