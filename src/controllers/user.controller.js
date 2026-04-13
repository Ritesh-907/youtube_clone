import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body;
    // console.log("Email:",email);
    // console.log("Password:",password);
    // console.log("Name:",username);
    // console.log("Full Name:",fullName);
    if (
        [username, email, password, fullName].some((field) => !field || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (existingUser) {
        throw new ApiError(409, "User with the same email or username already exists")
    }

    const avatarPath = req.files?.avatar[0]?.path;

    const coverImagePath = req.files?.coverImage[0]?.path;


    if (!avatarPath) {
        throw new ApiError(400, "Avatar image is required")
    }
    console.log("AvatarPath", avatarPath);
    console.log("CoverImagePath", coverImagePath);

    const avatar = await uploadToCloudinary(avatarPath);
    const coverImage = await uploadToCloudinary(coverImagePath);

    if (!avatar) {
        throw new ApiError(500, "Failed to upload avatar image")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || null,
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken ");

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user")
    }

    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

export { registerUser }