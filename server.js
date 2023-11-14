import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import projectRouter from './routes/project.js'
import userRouter from './routes/user.js'
import testimonialRouter from './routes/testimonial.js'
import adminRouter from './routes/adminRoute.js'
import cors from 'cors'
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload'
import passport from 'passport'
import session from 'express-session'

const app = express()


dotenv.config({
    path: "./config.env"
})

// Add After the Dotenv to Access Environment Vaiables 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


connectDB()


app.use(cors({
    origin: "https://ghareebstarprogrammers.vercel.app",
    credentials: true
}))

// Use session middleware
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// Initialize Passport and use session for persistent login sessions
app.use(passport.initialize());
app.use(passport.session());
// It is mandatory, otherwise you will be unable to find the error why the image is not uploading 🤣😥
app.use(fileUpload())
app.use(express.json({ limit: '10mb' }));
app.use(projectRouter)
app.use(userRouter)
app.use(testimonialRouter)
app.use(adminRouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT : ${process.env.PORT}`);
})