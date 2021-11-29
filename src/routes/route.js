const express = require('express');
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')


const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

module.exports = router;

router.post("/authors", AuthorController.createAuthor)
router.post("/blogs", BlogController.createBlog)
router.get("/blogs", BlogController.fetchBlogs)

