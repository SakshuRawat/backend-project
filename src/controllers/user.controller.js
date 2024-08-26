import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res)=>{
    // get user details from frontend 
    // validation - not empty
    // check if user alreaady exist : check by user name or email
    // check avatar , images
    // upload them to cloudinary, avatar check, 
    // create user object - create entry in db 
    // remove password and refreah token  field from response
    // check for user creation 
    // return res

     const {fullName, email, userName, pasasword } = req.body
        console.log("email:", email);

        // validation

    if(
        [fullName, email, userName, pasasword].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

        // if(fullName === ""){
        //     throw new ApiError(400, "Full name is required")
        // }

// user already exists or not
      const existedUser =   User.findOne({
            $or:[
                {userName},{email}
            ]
        })
        if(existedUser){
            throw new ApiError(409, "User already exists")
        }

        // check avatar & images

         const avatarLocalPath =  req.file?.avatar[0]?.path
         const coverImageLocalPath =  req.files?.coverImage[0]?.path

         if(!avatarLocalPath){
            throw new ApiError(400, "Avatar file is required")
         }

         // upload avatar and cover image in cloudinary
            
         const avatar = await uploadOnCloudinary(avatarLocalPath)
         const coverImage = await uploadOnCloudinary(coverImageLocalPath)

         // check avatar again 

         if(!avatar){
            throw new ApiError(400, "Avatar file is required")
         }

         // entry in db
     const user = await  User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            pasasword,
            userName: userName.toLowerCase(),

         })

        const createdUser  =  await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500, "something went wrong while registering a user")
        }

        // returnn res
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )


})

export {registerUser}