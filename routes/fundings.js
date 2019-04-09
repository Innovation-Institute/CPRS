const express = require('express');
const router = express.Router();
const FundingsController = require('../controllers/FundingsController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Fundings=new FundingsController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , Fundings.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated , Fundings.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , Fundings.edit);
router.post('/edit/:id', AuthController.isAuthenticated , Fundings.editPost, AuthController.isAuthenticated , Fundings.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , Fundings.add);
router.post('/add/', AuthController.isAuthenticated , Fundings.addPost, AuthController.isAuthenticated , Fundings.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated , Fundings.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated , Fundings.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated ,AuthController.isAdmin, Fundings.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated ,AuthController.isAdmin, Fundings.setMetadata);
router.get('/meta/', AuthController.isAuthenticated ,AuthController.isAdmin, Fundings.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated ,AuthController.isAdmin, Fundings.deleteMetadata);

module.exports = router;
