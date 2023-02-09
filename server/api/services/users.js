import User from "../models/users.js";
//service takes care of all business logic



export const search = (params = {}) => {

    //do processing here on parameters
    //const id = params.id || 1;

    const promise = User.find(params).exec();
    return promise;

};


export const create = (user) => {
    const newUser = new User(user);
  //  user._id = null;
// check params 
    return newUser.save();
}


export const get = (id) => {
    const promise = User.findById(id).exec();
    return promise;
}

//to update
export const update = (user) => {
    user._id = user.id;

    const getUser = User.findById(user.id).exec();

    //update in db
    const promise = User.findByIdAndUpdate(user.id, user, {
        new: true
    }).exec();
    return promise;
}

//to delete
export const remove = (id) => {
    const promise = User.findByIdAndDelete(id).exec();
    return promise;
}