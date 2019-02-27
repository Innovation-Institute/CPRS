const express = require('express');
const router = express.Router();
const <%= controllerFilename %> = require('../controllers/<%= controllerFilename %>');
<% controller=controllerFilename.replace("Controller","") %>
const <%= controller %>=new <%= controllerFilename %>();
/**
 * Index
 */
router.get('/', <%= controller %>.index);
/**
 * View
 */
router.get('/view/:id', <%= controller %>.view);
/**
 * Edit
 */
router.get('/edit/:id', <%= controller %>.edit);
router.post('/edit/:id', <%= controller %>.editPost, <%= controller %>.view);
/**
 * 
 * Create
 */

router.get('/add/', <%= controller %>.add);
router.post('/add/', <%= controller %>.addPost, <%= controller %>.view);

/**
 * Report
 */
router.get('/report', <%= controller %>.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', <%= controller %>.getMetadata);
router.put('/meta/add', <%= controller %>.addMetadata);
router.get('/meta/update', <%= controller %>.setMetadata);
router.get('/meta/', <%= controller %>.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue',<%= controller %>.deleteMetadata);

module.exports = router;
