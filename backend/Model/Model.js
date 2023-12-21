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

const movieSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        yearOfRelease: {
            type: Number,
            required: true,
        },
        plot: {
            type: String,
            required: true,
        },
        poster: {
            type: String, 
        },
        producer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producer',
            required: true,
        },
        actors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Actor',
            },
        ]
});

export const MovieModel = mongoose.model("movie",movieSchema)

const producerSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        profile:{
                type: String,
                required: true
        },
        bio: {
            type: String,
            required: true,
        },
});
export const ProducerModel = mongoose.model("producer",producerSchema)

const actorSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        profile:{
                type: String,
                required: true
        },
        bio: {
            type: String,
            required: true,
        },
});

export const ActorModel = mongoose.model("actor",actorSchema)