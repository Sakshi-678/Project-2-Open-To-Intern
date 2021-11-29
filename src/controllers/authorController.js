const AuthorModel = require('../models/authorModel')


const createAuthor = async function (req, res) {
    try{

        let body = req.body;
        let data = await AuthorModel.create(body);
        res.status(201).send({msg: data})

    }
    catch(err){

        res.status(405).send({msg: err.message})

    }
}

module.exports.createAuthor = createAuthor;