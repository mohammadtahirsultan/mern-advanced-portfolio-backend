


import express from "express"
import { getAllUsers, getUserDetail, updateUserProfileAdmin, deleteUserProfileAdmin } from "../controller/adminRoute.js"
import { isAdmin, isAuthenticated } from "../auth/isAuthenticated.js"
import { addNewBlog, deleteBlog, updateBlog } from "../controller/blogs.js"
import { addNewCategory, deleteCategory, editCategory } from "../controller/category.js"

const router = express.Router()



// Admin Routes Only 


router.get("/users", isAuthenticated, isAdmin, getAllUsers)

// router.get("/user/:id", isAuthenticated, isAdmin, getUserDetail)

// router.put("/user/:id", isAuthenticated, isAdmin, updateUserProfileAdmin)

// router.delete("/user/:id", isAuthenticated, isAdmin, deleteeUserProfileAdmin)

router.post("/blog/create", isAuthenticated, isAdmin, addNewBlog)

router.delete("/blog/delete/:id", isAuthenticated, isAdmin, deleteBlog)

router.put("/blog/:id", isAuthenticated, isAdmin, updateBlog)


router.post("/category/create", isAuthenticated, isAdmin, addNewCategory)

router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory)

router.put("/category/:id",isAuthenticated,isAdmin, editCategory)

router.route("/user/:id").get(isAuthenticated, isAdmin, getUserDetail).put(isAuthenticated, isAdmin, updateUserProfileAdmin).delete(isAuthenticated, isAdmin, deleteUserProfileAdmin)





export default router