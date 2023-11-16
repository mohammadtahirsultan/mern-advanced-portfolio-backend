import express from 'express'
import { getAllBlogs, getSingleBlog } from '../controller/blogs.js'


const router = express.Router()


router.get("/blogs/all", getAllBlogs)
router.get("/blog/:id", getSingleBlog)



export default router