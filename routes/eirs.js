const express = require('express');
const router = express.Router();
const EirsController = require('../controllers/EirsController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Eirs=new EirsController();

/**
 * Index
 */
router.get('/', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.edit);
router.post('/edit/:id', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.editPost, Eirs.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.add);
router.post('/add/', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.addPost, Eirs.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.setMetadata);
router.get('/meta/', AuthController.isAuthenticated,AuthController.isAdmin,Eirs.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',AuthController.isAuthenticated,AuthController.isAdmin,Eirs.deleteMetadata);

module.exports = router;
