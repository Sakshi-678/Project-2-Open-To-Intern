const express = require('express');
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
const Midd = require('../middleware/authMiddleware')


const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

module.exports = router;

router.post("/authors", AuthorController.createAuthor)
router.post("/blogs",  Midd.middleWare, BlogController.createBlog)
router.get("/blogs", Midd.middleWare, BlogController.fetchBlogs)
router.put("/blogs/:blogId", Midd.middleWare,  BlogController.updateBlog)
router.delete("/blogs/:blogId",  Midd.middleWare,  BlogController.deleteById)
router.delete("/blogs",  Midd.middleWare, BlogController.deleteByQuery)   
router.post("/login", AuthorController.login)   


