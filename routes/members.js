const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/MembersController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Members = new MembersController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , Members.index);
/**
 * View
 **/
router.get('/view/:id', AuthController.isAuthenticated , Members.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , Members.edit);
router.post('/edit/:id', AuthController.isAuthenticated , Members.editPost, AuthController.isAuthenticated , Members.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , Members.add);
router.post('/add/', AuthController.isAuthenticated , Members.addPost, AuthController.isAuthenticated , Members.view);

/**
 * Report
 * 
 */
router.get('/report', AuthController.isAuthenticated , Members.report);

/**
 * Members get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated , Members.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated ,AuthController.isAdmin, Members.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated ,AuthController.isAdmin, Members.setMetadata);
router.get('/meta/', AuthController.isAuthenticated ,AuthController.isAdmin, Members.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated ,AuthController.isAdmin, Members.deleteMetadata);

module.exports = router;
