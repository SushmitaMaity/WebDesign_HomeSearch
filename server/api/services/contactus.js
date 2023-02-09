import Contactus from "../models/contactus.js";
//service takes care of all business logic


/**
 * Search the contactus
 * @param {*} params 
 * @returns all contactus
 */
export const search = (params = {}) => {

    //do processing here on parameters
    //const id = params.id || 1;

    const promise = Contactus.find(params).exec();
    return promise;

};

//to post create
/**
 * 
 * @param {Contactus} contatcus 
 * @returns Contactus if success else failure
 */
export const create = (contactus) => {
    const newcontactus = new Contactus(contactus);
    //get the current utc datetime
    let currentdate = new Date();
    //set the create date
    newcontactus.createdDate = currentdate.toLocaleString();

    //unset id if there
    contactus._id = null;

    return newcontactus.save();
}

//to get
/**
 * get a contactus
 * @param {contactus.id} id 
 * @returns contactus
 */
export const get = (id) => {
    const promise = Contactus.findById(id).exec();
    return promise;
}

//to update
export const update = (contactus) => {
    contactus._id = contactus.id;

    // get the current utc datetime
    let currentdate = new Date();
    //get the created date actual
    const getContactus = Contactus.findById(contactus.id).exec();

    //set the original created date
    contactus.createdDate = getContactus.createdDate;

    //update in db
    const promise = Contactus.findByIdAndUpdate(contactus.id, contactus, {
        new: true
    }).exec();
    return promise;
}

//to delete
export const remove = (id) => {
    const promise = Contactus.findByIdAndDelete(id).exec();
    return promise;
}