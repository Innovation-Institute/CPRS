const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

/**
 * Index
 */
router.get('/', ReportController.index);
router.post('/', ReportController.createReport);
/**
 * Get the specfic report.
 
router.get('/ChancellorFunds', ReportController.ChancellorFunds);
router.get('/All', ReportController.All);
*/

module.exports = router ;
