/**
 * Importing dependencies
 */
import express from 'express';
import * as contactusController from '../controllers/contactus.js';

// Creating a router for contactus
const contactusRouter = express.Router();

/**
 * Search - GET /contactus
 * Create - POST /contactus
 */
contactusRouter.route('/contactus')
    .get(contactusController.index)
    .post(contactusController.createContactus);

contactusRouter.route('/contactus')
    .get(contactusController.getContactuss)

/**
 * Retrieve - GET /contactus/${id}
 * Update - PUT /contactus/${id}
 * Delete - DELETE/contactus/${id}
 */
contactusRouter.route('/contactus/:id')
    .delete(contactusController.removeContactus)
    .get(contactusController.getContactus)
    .put(contactusController.updateContactus);


export default contactusRouter;