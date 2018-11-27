const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/TeamsController');

/**
 * Index
 */
router.get('/', TeamsController.index);
/**
 * View
 */
router.get('/view/:id', TeamsController.view);
/**
 * Edit
 */
router.get('/edit/:id', TeamsController.edit);
router.post('/edit/:id', TeamsController.editPost);
/**
 * 
 * Create
 */

router.get('/add/', TeamsController.add);
router.post('/add/', TeamsController.addPost);

/**
 * Report
 */
router.get('/report', TeamsController.report);
router.post('/report', TeamsController.reportPost);

module.exports = router;
