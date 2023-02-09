/**
 * Importing dependencies
 */
 import express from 'express';
 import * as bookingController from '../controllers/booking.js';
 
 // Creating a router for house
 const bookingRouter = express.Router();
 
 /**
  * Search - GET /houses
  * Create - POST /houses
  */
 bookingRouter.route('/bookings')
     .get(bookingController.index)
     .post(bookingController.createBooking);
 
 /**
  * Retrieve - GET /houses/${id}
  * Update - PUT /houses/${id}
  * Delete - DELETE/houses/${id}
  */
bookingRouter.route('/bookings/:id')
     .delete(bookingController.removeBooking)
     .get(bookingController.getBooking)
     .put(bookingController.updateBooking);
 
 
 export default bookingRouter;