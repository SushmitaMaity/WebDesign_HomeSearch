/**
 * Importing dependencies
 */
 import express from 'express';
 import * as houseController from '../controllers/house.js';
 
 // Creating a router for house
 const houseRouter = express.Router();
 
 /**
  * Search - GET /houses
  * Create - POST /houses
  */
 houseRouter.route('/houses')
     .get(houseController.index)
     .post(houseController.createHouse);

     houseRouter.route('/houses')
     .get(houseController.getHouses)
 
 /**
  * Retrieve - GET /houses/${id}
  * Update - PUT /houses/${id}
  * Delete - DELETE/houses/${id}
  */
 houseRouter.route('/houses/:id')
     .delete(houseController.removeHouse)
     .get(houseController.getHouse)
     .put(houseController.updateHouse);
 
 
 export default houseRouter;