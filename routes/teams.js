const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/TeamsController');

const Teams=new TeamsController();
/**
 * Index
 */
router.get('/', Teams.index);
/**
 * View
 */
router.get('/view/:id', Teams.view);
/**
 * Edit
 */
router.get('/edit/:id', Teams.edit);
router.post('/edit/:id', Teams.editPost, Teams.view);
/**
 * 
 * Create
 */

router.get('/add/', Teams.add);
router.post('/add/', Teams.addPost, Teams.view);

/**
 * Report
 */
router.get('/report', Teams.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', Teams.getMetadata);
router.put('/meta/add', Teams.addMetadata);
router.get('/meta/update', Teams.setMetadata);
router.get('/meta/', Teams.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',Teams.deleteMetadata);

/**
 * 
 * 
 */


module.exports = router;
