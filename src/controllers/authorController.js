const AuthorModel = require('../models/authorModel')


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

module.exports.createAuthor = createAuthor;