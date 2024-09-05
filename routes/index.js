let router = require('express').Router();

let singers = require('./singers');
router.use('/singers', singers)

module.exports = router