import express from "express"
import { loginUser, logoutUser, updateUserProfile, deleteUserProfile, registerUser, getMyProfile, forgotPassword, resetPassword } from "../controller/user.js"
import { isAuthenticated } from "../auth/isAuthenticated.js"
import multer from "multer"

const upload = multer()
const router = express.Router()


const validateImageUpload = (req, res, next) => {
    ;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileMimeType = fileType(req.file.buffer);

    if (!fileMimeType || !fileMimeType.mime.startsWith('image')) {
        return res.status(400).json({ message: 'Only image files are allowed' });
    }

    next();
};

router.post("/user/register", registerUser)

router.post("/user/login", loginUser)

router.get("/user/profile", isAuthenticated, getMyProfile)

router.get("/user/logout", isAuthenticated, logoutUser)

router.put("/user/update", isAuthenticated, updateUserProfile)

// User Delete His Own Profile 
router.delete("/user/delete", isAuthenticated, deleteUserProfile)

router.post("/forgotpassword", forgotPassword)

router.put("/password/reset/:token", resetPassword)



export default router