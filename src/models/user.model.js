import mongoose, {Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,     
        unique: true,
        lowercase: true,
        trim: true,
        index: true   // for searchng field enable in any field
    },
    email: {
        type: String,
        required: true,     
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,     
        lowercase: true,
        index: true      
    },
    avatar: {
        type: String, // use cloudinary service/ url
        required: true,     
        
    },
    coverImage: {
        type: String, // use cloudinary service/ url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "password isrequired"]
    },
    reffreshToken: {
        type: String
    },
}, {timestamps: true})
// hooks => mongoose
// incrypt password using pr hook
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// checking password
userSchema.methods.isPasswordCorrect = async function (password){
return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
       
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)
}


export const User = mongoose.model("User", userSchema);

