import House from "../models/house.js";
//service takes care of all business logic


/**
 * Search the houses
 * @param {*} params 
 * @returns all houses
 */
export const search = (params = {}) => {

    //do processing here on parameters
    //const id = params.id || 1;

    const promise = House.find(params).exec();
    return promise;

};

//to post create
/**
 * 
 * @param {House} house 
 * @returns House if success else failure
 */
export const create = (house) => {
    const newhouse = new House(house);
    //get the current utc datetime
    let currentdate = new Date();
    //set the modified date
    newhouse.lastModifiedDate = currentdate.toLocaleString();
    //set the create date
    newhouse.createdDate = currentdate.toLocaleString();

    //unset id if there
    house._id = null;

    return newhouse.save();
}

//to get
/**
 * get a house
 * @param {house.id} id 
 * @returns house
 */
export const get = (id) => {
    const promise = House.findById(id).exec();
    return promise;
}

//to update
export const update = (house) => {
    house._id = house.id;

    // get the current utc datetime
    let currentdate = new Date();
    // sets the modified date
    house.lastModifiedDate = currentdate.toLocaleString();

    //get the created date actual
    const getHouse = House.findById(house.id).exec();

    //set the original created date
    house.createdDate = getHouse.createdDate;

    //update in db
    const promise = House.findByIdAndUpdate(house.id, house, {
        new: true
    }).exec();
    return promise;
}

//to delete
export const remove = (id) => {
    const promise = House.findByIdAndDelete(id).exec();
    return promise;
}