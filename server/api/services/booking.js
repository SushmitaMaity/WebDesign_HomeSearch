import Booking from "../models/booking.js";
//service takes care of all business logic


/**
 * Search the bookings
 * @param {*} params 
 * @returns all bookings
 */
export const search = (params = {}) => {

    //do processing here on parameters
    //const id = params.id || 1;

    const promise = Booking.find(params).exec();
    return promise;

};

//to post create
/**
 * 
 * @param {Booking} booking
 * @returns Booking if success else failure
 */
export const create = (booking) => {
    const newbooking = new Booking(booking);
    //get the current utc datetime
    let currentdate = new Date();
    //set the modified date
    //set the create date
    newbooking.createdDate = currentdate.toLocaleString();

    //unset id if there
    booking._id = null;

    return newbooking.save();
}

//to get
/**
 * get a booking
 * @param {booking.id} id 
 * @returns booking
 */
export const get = (id) => {
    const promise = Booking.findById(id).exec();
    return promise;
}

//to update
export const update = (booking) => {
    booking._id = booking.id;

    // get the current utc datetime
    let currentdate = new Date();
    // sets the modified date

    //get the created date actual
    const getBooking = Booking.findById(booking.id).exec();

    //set the original created date
    booking.createdDate = getBooking.createdDate;

    //update in db
    const promise = Booking.findByIdAndUpdate(booking.id, booking, {
        new: true
    }).exec();
    return promise;
}

//to delete
export const remove = (id) => {
    const promise = Booking.findByIdAndDelete(id).exec();
    return promise;
}