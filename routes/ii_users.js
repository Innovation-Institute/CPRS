const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Users=new UsersController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , Users.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated , Users.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , Users.edit);
router.post('/edit/:id', AuthController.isAuthenticated , Users.editPost, AuthController.isAuthenticated , Users.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , Users.add);
router.post('/add/', AuthController.isAuthenticated , Users.addPost, AuthController.addUser  , AuthController.isAuthenticated , Users.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated , Users.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated , Users.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated , Users.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated , Users.setMetadata);
router.get('/meta/', AuthController.isAuthenticated , Users.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated , Users.deleteMetadata);

module.exports = router;
