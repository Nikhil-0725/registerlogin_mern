import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model('User', UserSchema);