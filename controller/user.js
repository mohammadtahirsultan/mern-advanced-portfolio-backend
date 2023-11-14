import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sendEmail from "../sendEmail/sendEmail.js"
import crypto from 'crypto'
import cloudinary from 'cloudinary'
import setCookie from '../cookie/setCookie.js'



const validateImageUpload = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileMimeType = fileType(req.file.buffer);

    if (!fileMimeType || !fileMimeType.mime.startsWith('image')) {
        return res.status(400).json({ error: 'Only image files are allowed' });
    }

    next();
};
export const registerUser = async (req, res) => {

    try {

        let cloudinaryRes;
        if (req.body.image) {
            cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image,
                {
                    folder: "Ghareebstar-User",
                    crop: "scale",
                    width: 150
                },
            );
        }

        const { name, email, password } = req.body

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Registered"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            name, email, password: hashedPassword, image: {
                public_id: cloudinaryRes.public_id,
                url: cloudinaryRes.secure_url
            }
        })

        // const userToken = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);

        // return res.cookie("ghareebstar", userToken, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        // }).status(201).json({
        //     success: true,
        //     message: "User Registered Successfully",
        //     user
        // })

        setCookie(user, res, `Registered Successfully!`, 201);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}




export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        // 1st (argument) is User Entered Password, 2nd is Stored Password in Database
        // comparing user entered password with the stored password in database 
        let matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // const userToken = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
        // return res.cookie("ghareebstar", userToken, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        // }).status(200).json({
        //     success: true,
        //     message: "Logged In Successfully",
        //     user
        // })
        setCookie(user, res, `Welcome Back ${user.name}!`, 200);


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}



export const getMyProfile = async (req, res) => {
    try {

        let user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const logoutUser = async (req, res) => {
    try {

        let user = await User.findById(req?.user?._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res
            .status(200)
            .cookie("ghareebstar", "", {
                expires: new Date(Date.now()),
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
            })
            .json({
                success: true,
                message: "Logout Successfully!",
            });
        // return res.cookie("ghareebstar", null, {
        //     expires: new Date(0),
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        // }).status(200).json({
        //     success: true,
        //     message: "Logged Out Successfully"
        // })

        setCookie(user, res, "User Registered Successfully!", 201);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




export const updateUserProfile = async (req, res) => {
    try {

        let user = await User.findById(req?.user?._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }


        let cloudinaryRes;
        if (req.body.image) {
            // it means user has an image saved on cloudinary
            if (user.image && user.image.public_id) {

                let userImageId = user.image.public_id
                await cloudinary.v2.uploader.destroy(userImageId)

                cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image,
                    {
                        folder: "Ghareebstar-User",
                        crop: "scale",
                        width: 150
                    },
                );
            }


            user.image = {
                public_id: cloudinaryRes.public_id,
                url: cloudinaryRes.secure_url
            }
        }


        // we will add image later in every route which need image
        const { name, email, password } = req.body;

        if (name) {
            // this is database      this is given from user to update database
            user.name = name;
        }
        if (email) {
            // this is database stored value     this is given from user to update database

            user.email = email;
        }

        if (password) {
            let hashedPassword = await bcrypt.hash(password, 10)
            // this is database         this is given  from user to update database
            user.password = hashedPassword;
        }


        await user.save()
        const userToken = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);


        return res.cookie("ghareebstar", userToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        }).status(200).json({
            success: true,
            message: "Profile Updated Successfully"
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




export const deleteUserProfile = async (req, res) => {
    try {

        let user = await User.findById(req?.user?._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        let userImageId = user.image.public_id
        await cloudinary.v2.uploader.destroy(userImageId)

        await User.deleteOne(user)

        return res.cookie("ghareebstar", null, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(Date.now()),
        }).status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}







export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }


        let resetToken = await user.generateResetToken()

        await user.save()

        //front-end url
        let resetPasswordURL = `https://ghareebstarprogrammers.vercel.app/password/reset/${resetToken}`

        let message = `You Requested For Password Reset on Ghareebstar, \n\n Here is Your Reset Password URL, \n\n ${resetPasswordURL}. \n\n If you have not requested for reset password , Please Ignore this Email`


        try {

            await sendEmail({
                email: user.email,
                subject: "Reset Password Token for Ghareebstar.com",
                message
            })

            return res.status(200).json({
                success: true,
                message: `Email Sent to ${user.email}`
            })

        } catch (error) {

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





export const resetPassword = async (req, res) => {


    try {

        let resetTokenURL = req.params.token;

        // Here we will again hash the token ,if it matches with databse then we will allow the user to update the password  
        let resetPasswordToken = crypto.createHash('sha256').update(resetTokenURL).digest('hex')

        let user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or Expired Token"
            })
        }


        const { newPassword, confirmNewPassword } = req.body

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Password Doesn't Match!"
            })
        }


        let hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword;

        await user.save()


        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





