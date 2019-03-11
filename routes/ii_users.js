const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

const Users=new UsersController();
/**
 * Index
 */
router.get('/', Users.index);
/**
 * View
 */
router.get('/view/:id', Users.view);
/**
 * Edit
 */
router.get('/edit/:id', Users.edit);
router.post('/edit/:id', Users.editPost, Users.view);
/**
 * 
 * Create
 */

router.get('/add/', Users.add);
router.post('/add/', Users.addPost, Users.view);

/**
 * Report
 */
router.get('/report', Users.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', Users.getMetadata);
router.put('/meta/add', Users.addMetadata);
router.get('/meta/update', Users.setMetadata);
router.get('/meta/', Users.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',Users.deleteMetadata);

module.exports = router;
