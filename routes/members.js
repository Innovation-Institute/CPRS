const express = require('express');
const router = express.Router();
const Members = require('../controllers/MembersController');

const MembersController = new Members();
/**
 * Index
 */
router.get('/', MembersController.index);
/**
 * View
 **/
router.get('/view/:id', MembersController.view);
/**
 * Edit
 */
router.get('/edit/:id', MembersController.edit);
router.post('/edit/:id', MembersController.editPost, MembersController.view);
/**
 * 
 * Create
 */

router.get('/add/', MembersController.add);
router.post('/add/', MembersController.addPost, MembersController.view);

/**
 * Report
 * 
 */
router.get('/report', MembersController.report);

/**
 * Metadata Set and Clear
 */

router.get('/meta', MembersController.setMetadata);

module.exports = router;
