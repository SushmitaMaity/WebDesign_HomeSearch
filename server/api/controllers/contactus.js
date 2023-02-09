import { response } from 'express';
import * as contactusService from '../services/contactus.js';
import ContactUs from "../models/contactus.js";
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
 * @param {contactus} data 
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

        const contactuss = await contactusService.search();
        response.status(200);
        response.json(contactuss);
    } catch (e) {
        // response.status(500);
        // response.json({error : e.message} );

        errorHandler(e.message, response);
    }

};


/**
 * Function for create contactus
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 * 
 * Returns success or failure
 */
export const createContactus = async (request, response) => {

    try {
        const contactus = { ...request.body };
        contactus._id = undefined;
        const newcontactus = await contactusService.create(contactus);
        setSuccessResponse(newcontactus, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function to get contactus
 * @param {HttpRequest} request 
 * @param {HttpResponse} response
 * 
 * returns a contactus
 */
export const getContactus = async (request, response) => {
    try {
        const id = request.params.id;
        const contactus = await contactusService.get(id);
        setSuccessResponse(contactus, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
};
export const getContactuss = async (request, response) => {
    try {

        //const id = request.params.id;
        const contactus = await
            ContactUs.find();
        // usersService.find({});
        console.log("user in getUser", contactus);
        setSuccessResponse(contactus, response);


    } catch (e) {

        errorHandler(e.message, response);

    }
};


/**
 * Function for updating a contactus
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const updateContactus = async (request, response) => {

    try {
        const id = request.params.id;
        const contactus = { ...request.body, id };
        const upcontactus = await contactusService.update(contactus);
        setSuccessResponse(upcontactus, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function for deleting a contactus
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const removeContactus = async (request, response) => {

    try {
        const id = request.params.id;
        const contactus = await contactusService.remove(id);
        setSuccessResponse(contactus, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}