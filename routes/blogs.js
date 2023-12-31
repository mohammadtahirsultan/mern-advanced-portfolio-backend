import express from 'express'
import { addNewBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controller/blogs.js'
import { isAdmin, isAuthenticated } from '../auth/isAuthenticated.js'


const router = express.Router()


router.get("/blogs/all", getAllBlogs)
router.get("/blog/:id", getSingleBlog)

router.post("/blog/create", addNewBlog)

router.delete("/blog/delete/:id", deleteBlog)

router.put("/blog/:id", updateBlog)


export default router