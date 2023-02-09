import Mongoose from "mongoose";

/**
 * Schema for Contactus collection in mongo db
 */
const ContactusSchema = new Mongoose.Schema({
    // id:{
    //     type:String
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: "Street Address is required"
    },
    contact: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        // date is todays date 
        default: Date.now,
        // users cannot change
        unmodifiable: true
    },
},
    {
        versionKey: false
    });

ContactusSchema.virtual('id', () => this._id.toHexString());

ContactusSchema.set('toJSON', { virtuals: true });

//ContactusSchema collections name, give only singular word - ContactUs
const ContactUs = Mongoose.model('contactus', ContactusSchema);

export default ContactUs;