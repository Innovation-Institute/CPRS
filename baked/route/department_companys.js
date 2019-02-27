const express = require('express');
const router = express.Router();
const DepartmentCompanysController = require('../controllers/DepartmentCompanysController');

const DepartmentCompanys=new DepartmentCompanysController();
/**
 * Index
 */
router.get('/', DepartmentCompanys.index);
/**
 * View
 */
router.get('/view/:id', DepartmentCompanys.view);
/**
 * Edit
 */
router.get('/edit/:id', DepartmentCompanys.edit);
router.post('/edit/:id', DepartmentCompanys.editPost, DepartmentCompanys.view);
/**
 * 
 * Create
 */

router.get('/add/', DepartmentCompanys.add);
router.post('/add/', DepartmentCompanys.addPost, DepartmentCompanys.view);

/**
 * Report
 */
router.get('/report', DepartmentCompanys.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', DepartmentCompanys.getMetadata);
router.put('/meta/add', DepartmentCompanys.addMetadata);
router.get('/meta/update', DepartmentCompanys.setMetadata);
router.get('/meta/', DepartmentCompanys.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',DepartmentCompanys.deleteMetadata);

module.exports = router;
