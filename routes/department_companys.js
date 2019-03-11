const express = require('express');
const router = express.Router();
const DepartmentCompanysController = require('../controllers/DepartmentCompanysController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const DepartmentCompanys=new DepartmentCompanysController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , DepartmentCompanys.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated , DepartmentCompanys.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , DepartmentCompanys.edit);
router.post('/edit/:id', AuthController.isAuthenticated , DepartmentCompanys.editPost, AuthController.isAuthenticated , DepartmentCompanys.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , DepartmentCompanys.add);
router.post('/add/', AuthController.isAuthenticated , DepartmentCompanys.addPost, AuthController.isAuthenticated , DepartmentCompanys.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated , DepartmentCompanys.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated , DepartmentCompanys.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated , DepartmentCompanys.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated , DepartmentCompanys.setMetadata);
router.get('/meta/', AuthController.isAuthenticated , DepartmentCompanys.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated , DepartmentCompanys.deleteMetadata);

module.exports = router;
