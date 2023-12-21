import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
        fullName:{
                type:String,
                required:true
        },
        email:{
                type:String,
                required:true     
        },
        password:{
                type:String,
                required:true
        },
        role: {
                type: String,
                enum: ['User', 'Contributor', 'Admin'],
        },
        agreedToTerms: {
                type: Boolean,
        },
        signedUpAt:{
                type:Date,
                default:Date.now,
                immutable:true
            },
        authToken:{
                type:String,
        }
})

userSchema.methods.generateSessionToken = async function() {
        try {
            let token = jwt.sign({ _id: this._id }, process.env.AUTH_KEY,{ expiresIn: "2h" });
            this.sessionToken = token
            return token;
        } catch (err) {
            console.log(err);
        }
};
      
export const UserModel = mongoose.model("user",userSchema)