import { response } from 'express';
import * as houseService from '../services/house.js';
import House from "../models/house.js";
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
 * @param {house} data 
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

        const houses = await houseService.search();
        response.status(200);
        response.json(houses);
    } catch (e) {
        // response.status(500);
        // response.json({error : e.message} );

        errorHandler(e.message, response);
    }
    //houseService.search().then(resolve);
};


/**
 * Function for create house
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 * 
 * Returns success or failure
 */
export const createHouse = async (request, response) => {

    try {
        const house = {...request.body};
        house._id=undefined;
        const newhouse = await houseService.create(house);
        setSuccessResponse(newhouse, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function to get house
 * @param {HttpRequest} request 
 * @param {HttpResponse} response
 * 
 * returns a house 
 */
export const getHouse = async (request, response) => {
    try{
        const id = request.params.id;
        const house = await houseService.get(id);
        setSuccessResponse(house, response);

    } catch(e)
    {
        errorHandler(e.message,response);
    }
};
export const getHouses = async (request, response) => {
    try {

        //const id = request.params.id;
        const house = await
        House.find();
        // usersService.find({});
        console.log("user in getUser", house);
        setSuccessResponse(house, response);
        
        
        } catch (e) {
        
        errorHandler(e.message, response);
        
        }
};


/**
 * Function for updating a house
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const updateHouse = async (request, response) => {

    try {
        const id = request.params.id;
        const house = {...request.body, id};
        const uphouse = await houseService.update(house);
        setSuccessResponse(uphouse, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function for deleting a house
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const removeHouse = async (request, response) => {

    try {
        const id = request.params.id;
        const house = await houseService.remove(id);
        //{...request.body, id};
        //const newhouse = await houseService.update(house);
        setSuccessResponse(house, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}