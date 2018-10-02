const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index_controller');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.get('/edit/:id', indexController.edit);
router.post('/edit/:id', indexController.edit_post);



module.exports = router;