import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // revove password and refresh token field from response
    // check for user creation
    // return res

    const { fullname, email, username, password} = req.body;
    console.log("email", email)

    if([fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All field are required")
    };

    const existedUser = User.findOne({
        $or:[{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    const avatarLoacalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLoacalPath){
        throw new ApiError(400, "Avatar file is requied")
    }

   const avatar = await uploadOnCloudinary(avatarLoacalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
        throw new ApiError(400, "Avatar file id required")
   }

   const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
   })

   const createdUser = await User.findById(user._id).select(
    "-password - refreshToken "
   )
   if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
   }


   return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
   )

})

export {registerUser} 