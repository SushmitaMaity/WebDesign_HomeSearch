import Mongoose from "mongoose";

/**
 * Schema for House collection in mongo db
 */
const HouseSchema = new Mongoose.Schema({
    // id:{
    //     type:String
    // },
    name: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: "Street Address is required"
    },
    unit: {
        type: String,
        //Mandatory fields
        required: true
    },
    city: {
        type: String,
        required: true
    },
    states: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    pics: {
        type: Array,
        required: false
    },
    beds: {
        type: String,
        required: true
    },
    baths: {
        type: String,
        required: true
    },
    hoa: {
        type: String,
        required: false
    },
    homeType: {
        type: String,
        required: true
    },
    squareFeet: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    lat: {
        type: Number,
        default: 0.0
    },
    lng: {
        type: Number,
        default: 0.0

    },
    createdDate: {
        type: Date,
        // date is todays date 
        default: Date.now,
        // users cannot change
        unmodifiable: true

    },
    lastModifiedDate: {
        type: Date,
        // date is todays date 
        default: Date.now,
        // users cannot change
        unmodifiable: true
    },
    sellerEmailId:{
        type:String
    },
    favorite:{
        type: Array,
        required: false
    }
},
    {
        versionKey: false
    });

HouseSchema.virtual('id', () => this._id.toHexString());

HouseSchema.set('toJSON', { virtuals: true });

//Houses collections name, give only singular word - House
const House = Mongoose.model('House', HouseSchema);

export default House;