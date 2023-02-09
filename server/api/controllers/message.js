import { response } from 'express';
import * as messageService from '../services/message.js';

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
 * @param {message} data 
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

        const messages = await messageService.search();
        response.status(200);
        response.json(messages);
    } catch (e) {
        // response.status(500);
        // response.json({error : e.message} );

        errorHandler(e.message, response);
    }
    //messageService.search().then(resolve);
};


/**
 * Function for create message
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 * 
 * Returns success or failure
 */
export const createMessage = async (request, response) => {

    try {
        const message = {...request.body};
        message._id=undefined;
        const newmessage = await messageService.create(message);
        setSuccessResponse(newmessage, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function to get message
 * @param {HttpRequest} request 
 * @param {HttpResponse} response
 * 
 * returns a message 
 */
export const getMessage = async (request, response) => {
    try{
        const id = request.params.id;
        const message = await messageService.get(id);
        setSuccessResponse(message, response);

    } catch(e)
    {
        errorHandler(e.message,response);
    }
};


/**
 * Function for updating a message
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const updateMessage = async (request, response) => {

    try {
        const id = request.params.id;
        const message = {...request.body, id};
        const upmessage = await messageService.update(message);
        setSuccessResponse(upmessage, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function for deleting a message
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const removeMessage = async (request, response) => {

    try {
        const id = request.params.id;
        const message = await messageService.remove(id);
        //{...request.body, id};
        //const newmessage = await messageService.update(message);
        setSuccessResponse(message, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}