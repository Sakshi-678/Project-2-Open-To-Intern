const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')


const createBlog = async function (req, res) {
    try{
        let id = req.body.authorId;
        if(req.body.isPublished == true){
            req.body.publishedAt = Date.now()
        }

        let authorData = await AuthorModel.findOne({_id: id})
        if(authorData){
             
            let data = await BlogModel.create(body);
            res.status(201).send({status: true, data: data})

        }else{
            res.status(400).send({status: flase, msg: "invalid authorId provided"})
        }
    
    }
    catch(err){

        res.status(400).send({status: false, msg: err.message})

    }
}

const fetchBlogs = async function(req, res){
    try{

      //  let blogData = await BlogModel.find({isDeleted: false, isPublished: true})
        let querybody = req.query;


        let data = await BlogModel.find(querybody)
        res.status(200).send({status: true, data: data})

    }
    catch(err){
        res.status(400).send({msg: err.message})

    }
} 

const updateBlog = async function(req, res){

    try{
        let body = req.body;
        let id = req.params.blogId;
        if(body.hasOwnProperty("isPublished") == true){
            let updatedValue = await BlogModel.findOneAndUpdate({_id: id, isDeleted: false}, {$set:
                {
                    title: req.body.title,
                     body: req.body.body, 
                     category: req.body.category,
                     isPublished: req.body.isPublished,
                     publishedAt: Date.now(),
                     updatedAt: Date.now()
               }, 
               $push:{
                   tags: req.body.tags,
                    subcategory:req.body.subcategory
                }}, {new: true})

                res.status(200).send({status: true, data:updatedValue});     
            
            }
            else{
                let updatedValue = await BlogModel.findOneAndUpdate({_id: id, isDeleted: false}, {$set:
                    {
                        title: req.body.title,
                         body: req.body.body, 
                         category: req.body.category,
                         updatedAt: Date.now()
                   }, 
                   $push:{
                       tags: req.body.tags,
                        subcategory:req.body.subcategory
                    }}, {new: true})
    
                    res.status(200).send({status: true, data:updatedValue});

            }
    }
    catch(err){
        res.status(404).send({status: false, msg: err.message})  
    }
}

const deleteById = async function (req, res){
    try{
    let id = req.params.blogId;
    let data = await BlogModel.findOne({_id: id, isDeleted: false})
    if(data){

        let deleteData = await BlogModel.findOneAndUpdate({_id: id}, {$set:{isDeleted: true, deletedAt: Date.now()}}, {new: true})
        res.status(200).send({status: true})

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
    res.status(404).send({status: false, msg: err.message})
}
}

module.exports.createBlog = createBlog;  
module.exports.fetchBlogs = fetchBlogs;
module.exports.updateBlog = updateBlog;  
module.exports.deleteById = deleteById;  
module.exports.deleteByQuery = deleteByQuery;  