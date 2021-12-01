const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')


const createBlog = async function (req, res) {
    try {
        //authorisation
        let id = req.body.authorId;
        let decodeId = req.decodedtoken.userId;

        if (decodeId == id) {

            if (req.body.isPublished == true) {
                req.body.publishedAt = Date.now()
            }

            let authorData = await AuthorModel.findOne({ _id: id })
            if (authorData) {
                let body = req.body;
                let data = await BlogModel.create(body);
                res.status(201).send({ status: true, data: data })

            }
        }
        else {
            res.status(500).send({ status: false, msg: 'invalid author id or invalid token' })
        }

    }
    catch (err) {

        res.status(401).send({ status: false, msg: err.message })

    }
}

const fetchBlogs = async function (req, res) {
    try {

        let querybody = req.query;

        let data = await BlogModel.find(querybody)
        if (data.length == 0) {
            res.status(404).send({ status: false, msg: "no data found" })
        } else {
            res.status(200).send({ status: true, data: data })
        }
    }
    catch (err) {
        res.status(400).send({ msg: err.message })

    }
}

const updateBlog = async function (req, res) {

    try {
        let decodeId = req.decodedtoken.userId;
        let blogId = req.params.blogId;

        let blogUser = await BlogModel.findOne({ _id: blogId })
        if (!blogUser) {
            return res.status(400).send({ status: false, msg: 'invalid blog id' })
        }

        let authorId = blogUser.authorId;

        if (decodeId == authorId) {


            let body = req.body;
            let id = req.params.blogId;
            if (body.hasOwnProperty("isPublished") == true) {
                let updatedValue = await BlogModel.findOneAndUpdate({ _id: id, isDeleted: false }, {
                    $set:
                    {
                        title: req.body.title,
                        body: req.body.body,
                        category: req.body.category,
                        isPublished: req.body.isPublished,
                        publishedAt: Date.now(),
                        updatedAt: Date.now()
                    },
                    $push: {
                        tags: req.body.tags,
                        subcategory: req.body.subcategory
                    }
                }, { new: true })

                res.status(200).send({ status: true, data: updatedValue });

            }
            else {
                let updatedValue = await BlogModel.findOneAndUpdate({ _id: id, isDeleted: false }, {
                    $set:
                    {
                        title: req.body.title,
                        body: req.body.body,
                        category: req.body.category,
                        updatedAt: Date.now()
                    },
                    $push: {
                        tags: req.body.tags,
                        subcategory: req.body.subcategory
                    }
                }, { new: true })

                res.status(200).send({ status: true, data: updatedValue });


            }
        }

    }
    catch (err) {
        res.status(404).send({ status: false, msg: err.message })
        console.log(err.message)
    }
}

const deleteById = async function (req, res) {
    try {
        let decodeId = req.decodedtoken.userId;
        let blogId = req.params.blogId;

        let blogUser = await BlogModel.findOne({ _id: blogId })
        if (!blogUser) {
            return res.status(400).send({ status: false, msg: 'invalid blog id' })
        }

        let authorId = blogUser.authorId;

        if (decodeId == authorId) {

            let id = req.params.blogId;
            let data = await BlogModel.findOne({ _id: id, isDeleted: false })
            if (data) {

                let deleteData = await BlogModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
                res.status(200).send({ status: true })

            } else {
                res.send({ msg: "invalid input of id or the document is already delete" })
            }
        }
    }
     catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

const deleteByQuery = async function (req, res) {
    try {
        let decodeId = req.decodedtoken.userId;
        let authorId =  req.query.authorId;
        if(decodeId == authorId){
        let input = req.query;
        let deleteData = await BlogModel.findOneAndUpdate(input, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        res.status(200).send({ msg: deleteData })
    }
}
    catch (err) {
        res.status(404).send({ status: false, msg: err.message })
    }
}

module.exports.createBlog = createBlog;
module.exports.fetchBlogs = fetchBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteById = deleteById;
module.exports.deleteByQuery = deleteByQuery;