import Mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
/**
 * Schema for User collection in mongo db
 */
const UserSchema = new Mongoose.Schema({
    // id:{
    //     type:String
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        // required: true
    },
},
    {
        versionKey: false
    });

// UserSchema.virtual('id', () => this._id.toHexString());


UserSchema.plugin(uniqueValidator, { message: "validation email has to be unique" });
UserSchema.set('toJSON', { virtuals: true });
const User = Mongoose.model('User', UserSchema);

export default User;