const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/TeamsController');

const Teams=new TeamsController();
/**
 * Index
 */
router.get('/', Teams.index);
/**
 * View
 */
router.get('/view/:id', Teams.view);
/**
 * Edit
 */
router.get('/edit/:id', Teams.edit);
router.post('/edit/:id', Teams.editPost, Teams.view);
/**
 * 
 * Create
 */

router.get('/add/', Teams.add);
router.post('/add/', Teams.addPost, Teams.view);

/**
 * Report
 */
router.get('/report', Teams.report);

module.exports = router;
