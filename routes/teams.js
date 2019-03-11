const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/TeamsController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Teams=new TeamsController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , Teams.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated , Teams.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , Teams.edit);
router.post('/edit/:id', AuthController.isAuthenticated , Teams.editPost, AuthController.isAuthenticated , Teams.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , Teams.add);
router.post('/add/', AuthController.isAuthenticated , Teams.addPost, AuthController.isAuthenticated , Teams.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated , Teams.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated , Teams.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated , Teams.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated , Teams.setMetadata);
router.get('/meta/', AuthController.isAuthenticated , Teams.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated , Teams.deleteMetadata);

module.exports = router;
