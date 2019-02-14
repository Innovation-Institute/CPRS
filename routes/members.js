const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/MembersController');

const Members = new MembersController();
/**
 * Index
 */
router.get('/', Members.index);
/**
 * View
 **/
router.get('/view/:id', Members.view);
/**
 * Edit
 */
router.get('/edit/:id', Members.edit);
router.post('/edit/:id', Members.editPost, Members.view);
/**
 * 
 * Create
 */

router.get('/add/', Members.add);
router.post('/add/', Members.addPost, Members.view);

/**
 * Report
 * 
 */
router.get('/report', Members.report);

/**
 * Members get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', Members.getMetadata);
router.put('/meta/add', Members.addMetadata);
router.get('/meta/update', Members.setMetadata);
router.get('/meta/', Members.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',Members.deleteMetadata);

module.exports = router;
