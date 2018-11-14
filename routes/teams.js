const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');

/**
 * Index
 */
router.get('/', TeamController.index);
/**
 * View
 */
router.get('/view/:id', TeamController.view);
/**
 * Edit
 */
router.get('/edit/:id', TeamController.edit);
router.post('/edit/:id', TeamController.editPost);
/**
 * Report
 */
router.get('/report', TeamController.report);
router.post('/report', TeamController.reportPost);

module.exports = router;
