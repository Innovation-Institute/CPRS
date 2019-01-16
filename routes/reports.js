const express = require('express');
const router = express.Router();
const Reports = require('../controllers/ReportsController');

const ReportsController= new Reports();

/**
 * Index
 */
router.get('/', ReportsController.index);
router.post('/', ReportsController.createReport);
/**
 * Get the specfic report.
 
router.get('/ChancellorFunds', ReportController.ChancellorFunds);
router.get('/All', ReportController.All);
*/

module.exports = router;
