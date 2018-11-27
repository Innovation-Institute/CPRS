const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
var bodyParser = require('body-parser');

router.get('/', AppController.index)
router.get('/box', AppController.boxTest)


/** Legacy code. */
router.post('/list/:table', AppController.listField);
router.post('/filter/:table', AppController.filterField);

module.exports = router;