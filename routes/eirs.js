const express = require('express');
const router = express.Router();
const EirsController = require('../controllers/EirsController');

const Eirs=new EirsController();
/**
 * Index
 */
router.get('/', Eirs.index);
/**
 * View
 */
router.get('/view/:id', Eirs.view);
/**
 * Edit
 */
router.get('/edit/:id', Eirs.edit);
router.post('/edit/:id', Eirs.editPost, Eirs.view);
/**
 * 
 * Create
 */

router.get('/add/', Eirs.add);
router.post('/add/', Eirs.addPost, Eirs.view);

/**
 * Report
 */
router.get('/report', Eirs.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', Eirs.getMetadata);
router.put('/meta/add', Eirs.addMetadata);
router.get('/meta/update', Eirs.setMetadata);
router.get('/meta/', Eirs.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',Eirs.deleteMetadata);

module.exports = router;
