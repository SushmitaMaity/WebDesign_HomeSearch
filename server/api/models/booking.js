import Mongoose from "mongoose";

/**
 * Schema for booking collection in mongo db
 */
const BookingSchema = new Mongoose.Schema({

    buyerID: {
        type: String,
        required: true
    },
    buyerEmail: {
        type: String,
        required: true
    },
    buyerContact: {
        type: String,
        required: true
    },
    houseID: {
        type: String,
        required: true
    },
    houseName: {
        type: String,
        required: true
    },
    sellerID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        // users cannot change
        unmodifiable: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },

},
    {
        versionKey: false
    });

BookingSchema.virtual('id', () => this._id.toHexString());

BookingSchema.set('toJSON', { virtuals: true });

//bookings collections name, give only singular word - booking
const Booking = Mongoose.model('booking', BookingSchema);

export default Booking;