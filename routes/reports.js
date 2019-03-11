const express = require('express');
const router = express.Router();
const Reports = require('../controllers/ReportsController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const ReportsController= new Reports();

/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , ReportsController.index);
router.post('/', AuthController.isAuthenticated , ReportsController.createReport);
/**
 * Get the specfic report.
 
router.get('/ChancellorFunds', ReportController.ChancellorFunds);
router.get('/All', ReportController.All);
*/

module.exports = router;
