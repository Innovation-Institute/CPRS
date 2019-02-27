const express = require('express');
const router = express.Router();
const TeamCategorysController = require('../controllers/TeamCategorysController');

const TeamCategorys=new TeamCategorysController();
/**
 * Index
 */
router.get('/', TeamCategorys.index);
/**
 * View
 */
router.get('/view/:id', TeamCategorys.view);
/**
 * Edit
 */
router.get('/edit/:id', TeamCategorys.edit);
router.post('/edit/:id', TeamCategorys.editPost, TeamCategorys.view);
/**
 * 
 * Create
 */

router.get('/add/', TeamCategorys.add);
router.post('/add/', TeamCategorys.addPost, TeamCategorys.view);

/**
 * Report
 */
router.get('/report', TeamCategorys.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', TeamCategorys.getMetadata);
router.put('/meta/add', TeamCategorys.addMetadata);
router.get('/meta/update', TeamCategorys.setMetadata);
router.get('/meta/', TeamCategorys.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',TeamCategorys.deleteMetadata);

module.exports = router;
