const express = require('express');
const router = express.Router();
const EirsController = require('../controllers/EirsController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Eirs=new EirsController();

/**
 * Index
 */
router.get('/', AuthController.isAuthenticated,Eirs.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated,Eirs.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated,Eirs.edit);
router.post('/edit/:id', AuthController.isAuthenticated,Eirs.editPost, Eirs.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated,Eirs.add);
router.post('/add/', AuthController.isAuthenticated,Eirs.addPost, Eirs.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated,Eirs.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated,Eirs.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated,Eirs.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated,Eirs.setMetadata);
router.get('/meta/', AuthController.isAuthenticated,Eirs.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',AuthController.isAuthenticated,Eirs.deleteMetadata);

module.exports = router;
