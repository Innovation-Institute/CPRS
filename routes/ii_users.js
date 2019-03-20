const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Users=new UsersController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated ,AuthController.isAdmin, Users.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated ,AuthController.isAdmin, Users.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated ,AuthController.isAdmin, Users.edit);
router.post('/edit/:id', AuthController.isAuthenticated ,AuthController.isAdmin, Users.editPost, AuthController.isAuthenticated , Users.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated ,AuthController.isAdmin, Users.add);
router.post('/add/', AuthController.isAuthenticated ,AuthController.isAdmin, Users.addPost, AuthController.addUser  , AuthController.isAuthenticated , Users.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated ,AuthController.isAdmin, Users.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated ,AuthController.isAdmin, Users.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated ,AuthController.isAdmin, Users.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated ,AuthController.isAdmin, Users.setMetadata);
router.get('/meta/', AuthController.isAuthenticated ,AuthController.isAdmin, Users.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated ,AuthController.isAdmin, Users.deleteMetadata);

module.exports = router;
