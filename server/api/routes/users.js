/**
 * Importing dependencies
 */
 import express from 'express';
 import * as usersController from '../controllers/users.js';
 
 // Creating a router for user
 const usersRouter = express.Router();
 
 /**
  * Search - GET /users
  * Create - POST /users
  */
//   usersRouter.route('/login')
//   .get(usersController.index)
//   .post(usersController.createUsers);

/**
* Retrieve - GET /houses/${id}
* Update - PUT /houses/${id}
* Delete - DELETE/houses/${id}
*/
// usersRouter.route('/login/:id')
//   .delete(usersController.removeUser)
//   .get(usersController.getUser)
//   .put(usersController.updateUser);
usersRouter.route('/users')
      .get(usersController.getUser);

  usersRouter.route('/login')
      .post(usersController.index);

 usersRouter.route('/signup')
 .get(usersController.getUser)
      .post(usersController.createUsers)
      ;
 /**
  * Retrieve - GET /houses/${id}
  * Update - PUT /houses/${id}
  * Delete - DELETE/houses/${id}
  */
//   usersRouter.route('/login/:id')
//      .delete(usersController.removeUser)
//      .get(usersController.getUser)
//      .put(usersController.updateUser);
 
 
 export default usersRouter;