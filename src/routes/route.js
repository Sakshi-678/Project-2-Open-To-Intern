const express = require('express');
const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')
//const Midd = require('../middleware/authMiddleware')

const router = express.Router();
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')

module.exports = router;

router.post("/functionup/colleges",  collegeController.createColleges)//q1

router.post("/functionup/interns",  internController.create);



