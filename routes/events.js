const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/EventsController');

const Events=new EventsController();
/**
 * Index
 */
router.get('/', Events.index);
/**
 * View
 */
router.get('/view/:id', Events.view);
/**
 * Edit
 */
router.get('/edit/:id', Events.edit);
router.post('/edit/:id', Events.editPost, Events.view);
/**
 * 
 * Create
 */

router.get('/add/', Events.add);
router.post('/add/', Events.addPost, Events.view);

/**
 * Report
 */
router.get('/report', Events.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', Events.getMetadata);
router.put('/meta/add', Events.addMetadata);
router.get('/meta/update', Events.setMetadata);
router.get('/meta/', Events.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',Events.deleteMetadata);

module.exports = router;