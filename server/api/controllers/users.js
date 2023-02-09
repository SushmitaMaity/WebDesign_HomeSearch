import * as usersService from '../services/users.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import User from "../models/users.js";
// import keys from "../config/keys.js";

//import validateLoginInput from "../validator/login";
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
 * @param {users} data 
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
    console.log("inside index request:::", request.body.userData);
    try {

        const users = await usersService.search();

        // response.status(200);
        // response.json(users);

        var email = request.body.userData.email;
        var password = request.body.userData.password;

        // Find user by email
        User.findOne({
            email
        }).then(user => {
            // Check if user exists
            
            // if(email=="admin@asap.com" && password=="Admin123"){
            //     const payload = {
            //         id: "1",
            //         name: user.name,
            //         role: "admin",
            //         email: user.email
            //     };
            //     return response
            //         .send({
            //             loginsuccess: true, data: payload
            //         });
            // }
            if (!user) {
                return response.status(404).json({
                    emailnotfound: "Email not found"
                });
            }
            if (password == user.password) {
                const payload = {
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email
                };
                return response
                    .send({
                        loginsuccess: true, data: payload
                    });
            } else return response.send({
                loginsuccess: false
            });
        });

    } catch (e) {
        // response.status(500);
        // response.json({error : e.message} );

        errorHandler(e.message, response);
    }
    //usersService.search().then(resolve);
};


/**
 * Function for create users
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 * 
 * Returns success or failure
 */
export const createUsers = async (request, response) => {
    console.log("in createusers", request.body);
    try {
        const user = { ...request.body.userData };
         user._id=undefined;
        const newUser = await usersService.create(user);
        setSuccessResponse(newUser, response);


    // User.findOne({
    //     email: user.email
    // }).then(user => {
    //     if (user) {
    //         console.log("user inside .then", user);
    //         return response.status(400).json({
    //             email: "Email already exists"
    //         });
    //     } 
    //     else {
           
    //        const newUser = 
    //        //await
    //         usersService.create(user);
    //        setSuccessResponse(newUser, response);
    //        return response.send({
    //         success: "Sign Up successful"
    //     });

    //      }
    // })
    
        
    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function to get users
 * @param {HttpRequest} request 
 * @param {HttpResponse} response
 * 
 * returns a user
 */
export const getUser = async (request, response) => {
    try {
        //const id = request.params.id;
        const user = await 
        User.find();
        // usersService.find({});
         console.log("user in getUser", user);
         setSuccessResponse(user, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
};


/**
 * Function for updating a user
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const updateUser = async (request, response) => {

    try {
        const id = request.params.id;
        const user = { ...request.body, id };
        const updateUser = await usersService.update(user);
        setSuccessResponse(updateUser, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}

/**
 * Function for deleting a user
 * @param {HttpRequest} request 
 * @param {HttpResponse} response 
 */
export const removeUser = async (request, response) => {

    try {
        const id = request.params.id;
        const user = await userService.remove(id);
        //{...request.body, id};

        setSuccessResponse(user, response);

    } catch (e) {
        errorHandler(e.message, response);
    }
}