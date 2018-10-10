const express = require('express');
const router = express.Router();
const AppController = require('../Controller/AppController');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.post('/list/:table', AppController.listField);

module.exports = router;