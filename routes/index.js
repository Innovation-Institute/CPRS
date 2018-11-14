const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
var bodyParser = require('body-parser');

router.get('/', AppController.index)

router.post('/list/:table', AppController.listField);
router.post('/filter/:table', AppController.filterField);

router.get('/report/:report_name', AppController.reportRecords)

module.exports = router;