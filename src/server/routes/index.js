const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index_controller');


router.get('/', indexController.table_report);


module.exports = router;