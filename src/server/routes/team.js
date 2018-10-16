const express = require('express');
const router = express.Router();
const TeamController = require('../Controller/TeamController');

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.get('/:table', TeamController.index);

router.get('/:table/view/:id', TeamController.view);

router.get('/:table/edit/:id', TeamController.edit);
router.post('/:table/edit/:id', TeamController.editPost);

router.get('/:table/report', TeamController.report);
router.post('/:table/report', TeamController.reportPost);

module.exports = router;
