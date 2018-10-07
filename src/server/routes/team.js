const express = require('express');
const router = express.Router();
const TeamController = require('../Controller/TeamController');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.get('/:table/edit/:id', TeamController.edit);
router.post('/:table/edit/:id', TeamController.edit_post);



module.exports = router;