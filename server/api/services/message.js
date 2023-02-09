import Message from "../models/message.js";
//service takes care of all business logic


/**
 * Search the messages
 * @param {*} params 
 * @returns all messages
 */
export const search = (params = {}) => {

    //do processing here on parameters
    //const id = params.id || 1;

    const promise = Message.find(params).exec();
    return promise;

};

//to post create
/**
 * 
 * @param {Message} message 
 * @returns Message if success else failure
 */
export const create = (message) => {
    const newmessage = new Message(message);
    //get the current utc datetime
    let currentdate = new Date();
    //set the modified date
    newmessage.lastModifiedDate = currentdate.toLocaleString();
    //set the create date
    newmessage.createdDate = currentdate.toLocaleString();

    //unset id if there
    message._id = null;

    return newmessage.save();
}

//to get
/**
 * get a message
 * @param {message.id} id 
 * @returns message
 */
export const get = (id) => {
    const promise = Message.findById(id).exec();
    return promise;
}

//to update
export const update = (message) => {
    message._id = message.id;

    // get the current utc datetime
    let currentdate = new Date();
    // sets the modified date
    message.lastModifiedDate = currentdate.toLocaleString();

    //get the created date actual
    const getMessage = Message.findById(message.id).exec();

    //set the original created date
    message.createdDate = getMessage.createdDate;

    //update in db
    const promise = Message.findByIdAndUpdate(message.id, message, {
        new: true
    }).exec();
    return promise;
}

//to delete
export const remove = (id) => {
    const promise = Message.findByIdAndDelete(id).exec();
    return promise;
}