import { response } from 'express';
import * as bookingService from '../services/booking.js';

/**
 * Error Handler method
 * @param {String} message 
 * @param {HttpResponse} response 
 */
const errorHandler = (message, response) => {
    response.status(500);
    response.json({
        error: message
    });
    console.log(message);
};


/**
 * Set Success Handler method
 * @param {booking} data 
 * @param {HttpResponse} response 
 */
const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}


/**
 * Function either by get, push, put, delete request
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const index = async (request, response) => {
    try {

        const bookings = await bookingService.search();
        response.status(200);
        response.json(bookings);
    } catch (e) {
        // response.status(500);
        // response.json({error : e.message} );

        errorHandler(e.message, response);
    }
    //bookingService.search().then(resolve);
};


/**
 * Function for create booking
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 * 
 * Returns success or failure
 */
export const createBooking = async (request, response) => {

    try {
        const booking = { ...request.body };
        booking._id = undefined;
        const newbooking = await bookingService.create(booking);
        setSuccessResponse(newbooking, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function to get booking
 * @param {HttpRequest} request 
 * @param {HttpResponse} response
 * 
 * returns a booking 
 */
export const getBooking = async (request, response) => {
    try {
        const id = request.params.id;
        const booking = await bookingService.get(id);
        setSuccessResponse(booking, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
};


/**
 * Function for updating a booking
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const updateBooking = async (request, response) => {

    try {
        const id = request.params.id;
        const booking = { ...request.body, id };
        const upbooking = await bookingService.update(booking);
        setSuccessResponse(upbooking, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function for deleting a booking
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const removeBooking = async (request, response) => {

    try {
        const id = request.params.id;
        const booking = await bookingService.remove(id);
        //{...request.body, id};
        //const newbooking = await bookingService.update(booking);
        setSuccessResponse(booking, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}