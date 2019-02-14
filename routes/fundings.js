const express = require('express');
const router = express.Router();
const FundingsController = require('../controllers/FundingsController');

const Fundings=new FundingsController();
/**
 * Index
 */
router.get('/', Fundings.index);
/**
 * View
 */
router.get('/view/:id', Fundings.view);
/**
 * Edit
 */
router.get('/edit/:id', Fundings.edit);
router.post('/edit/:id', Fundings.editPost, Fundings.view);
/**
 * 
 * Create
 */

router.get('/add/', Fundings.add);
router.post('/add/', Fundings.addPost, Fundings.view);

/**
 * Report
 */
router.get('/report', Fundings.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', Fundings.getMetadata);
router.put('/meta/add', Fundings.addMetadata);
router.get('/meta/update', Fundings.setMetadata);
router.get('/meta/', Fundings.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',Fundings.deleteMetadata);

module.exports = router;
