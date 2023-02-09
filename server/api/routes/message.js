/**
 * Importing dependencies
 */
 import express from 'express';
 import * as messageController from '../controllers/message.js';
 
 // Creating a router for message
 const messageRouter = express.Router();
 
 /**
  * Search - GET /messages
  * Create - POST /messages
  */
 messageRouter.route('/messages')
     .get(messageController.index)
     .post(messageController.createMessage);
 
 /**
  * Retrieve - GET /messages/${id}
  * Update - PUT /messages/${id}
  * Delete - DELETE/messages/${id}
  */
 messageRouter.route('/messages/:id')
     .delete(messageController.removeMessage)
     .get(messageController.getMessage)
     .put(messageController.updateMessage);
 
 
 export default messageRouter;