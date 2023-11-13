import express from 'express'
import { addNewBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controller/blogs.js'
import { isAdmin, isAuthenticated } from "../auth/isAuthenticated.js"

const router = express.Router()


router.get("/blogs/all", getAllBlogs)

router.post("/blog/create", isAuthenticated, isAdmin, addNewBlog)

router.get("/blog/:id", getSingleBlog)

router.delete("/blog/delete/:id", isAuthenticated, isAdmin, deleteBlog)

router.put("/blog/:id", isAuthenticated, isAdmin, updateBlog)


export default router