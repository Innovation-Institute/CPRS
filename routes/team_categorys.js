const express = require('express');
const router = express.Router();
const TeamCategorysController = require('../controllers/TeamCategorysController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const TeamCategorys=new TeamCategorysController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , TeamCategorys.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated , TeamCategorys.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , TeamCategorys.edit);
router.post('/edit/:id', AuthController.isAuthenticated , TeamCategorys.editPost, AuthController.isAuthenticated , TeamCategorys.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , TeamCategorys.add);
router.post('/add/', AuthController.isAuthenticated , TeamCategorys.addPost, AuthController.isAuthenticated , TeamCategorys.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated , TeamCategorys.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated ,AuthController.isAdmin, TeamCategorys.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated ,AuthController.isAdmin, TeamCategorys.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated ,AuthController.isAdmin, TeamCategorys.setMetadata);
router.get('/meta/', AuthController.isAuthenticated ,AuthController.isAdmin, TeamCategorys.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated ,AuthController.isAdmin, TeamCategorys.deleteMetadata);

module.exports = router;
