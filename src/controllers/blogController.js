const BlogModel = require('../models/blogModel')


const createBlog = async function (req, res) {
    try{

        let body = req.body;
        let data = await BlogModel.create(body);
        res.status(201).send({msg: data})

    }
    catch(err){

        res.status(405).send({msg: err.message})

    }
}

const fetchBlogs = async function(req, res){
    try{
        let body = req.body;
        let parambody = req.query;

        console.log(parambody)

        let data = await BlogModel.find(parambody)
        res.status(200).send({msg: data})

    }
    catch(err){
        res.status(400).send({msg: err.message})

    }
} 

module.exports.createBlog = createBlog; 
module.exports.fetchBlogs = fetchBlogs;
