const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/MembersController');

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
router.post('/edit/:id', MembersController.editPost);
/**
 * 
 * Create
 */

router.get('/add/', MembersController.add);
router.post('/add/', MembersController.addPost);

/**
 * Report
 */
router.get('/report', MembersController.report);

/**
 * Report
 *
router.get('/report', MembersController.report);
router.post('/report', MembersController.reportPost);
**/
module.exports = router;
