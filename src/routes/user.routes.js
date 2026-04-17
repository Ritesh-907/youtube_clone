import { Router } from "express";
import {
    loginUser,
    logoutUSer,
    registerUser,
    refreshAccessToken,
    getCurentUser,
    changeCurrentPassword,
    updateAccountDetails,   
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUSer)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)
router.route("/profile").get(verifyJWT, getCurentUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/update-profile").patch(verifyJWT, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/update-coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router;