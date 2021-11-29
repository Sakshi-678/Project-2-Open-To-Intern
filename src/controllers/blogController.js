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
       // let body = req.body;
        let parambody = req.query;

       // console.log(parambody)

        let data = await BlogModel.find(parambody)
        res.status(200).send({msg: data})

    }
    catch(err){
        res.status(400).send({msg: err.message})

    }
} 

const updateBlog = async function(req, res){

    try{
        let body = req.body;
        let id = req.params.blogId;
        let updatedValue = await BlogModel.findOneAndUpdate({_id: id, isDeleted: false}, {$set:{title: req.body.title, body: req.body.body, category: req.body.category}, $push:{tags: req.body.tags, subcategory:req.body.subcategory}}, {new: true})
        res.status(200).send({msg:updatedValue})
       // console.log("bddnjdbjdk")

        if(body.hasOwnProperty("isPublished") == true){
            let publishUpdate = await BlogModel.findOneAndUpdate({_id: id, isDeleted: false}, {$set:{isPublished: req.body.isPublished, publishedAt: Date.now()}}, {new: true})
            res.status(200).send({msg: publishUpdate})
        }
    }
    catch(err){
        res.status(404).send(err)  
    }
}

const deleteById = async function (req, res){
    try{
    let id = req.params.blogId;
    let data = await BlogModel.findOne({_id: id, isDeleted: false})
    if(data){

        let deleteData = await BlogModel.findOneAndUpdate({_id: id}, {$set:{isDeleted: true, deletedAt: Date.now()}}, {new: true})
        res.status(200).send({msg: deleteData})

    }else{
        res.send({msg: "invalid input of id or the document is already delete"})
    }
}catch(err){
    res.status(400).send({msg: err.message})
}
}

const deleteByQuery = async function (req, res){
    try{
    let input = req.query;
    let deleteData = await BlogModel.findOneAndUpdate(input, {$set:{isDeleted: true, deletedAt: Date.now()}}, {new: true})
    res.status(200).send({msg: deleteData})
}
catch(err){
    res.status(404).send({msg: err.message})
}
}

module.exports.createBlog = createBlog;  
module.exports.fetchBlogs = fetchBlogs;
module.exports.updateBlog = updateBlog;  
module.exports.deleteById = deleteById;  
module.exports.deleteByQuery = deleteByQuery;  