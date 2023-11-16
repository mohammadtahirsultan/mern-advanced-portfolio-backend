import express from 'express'
import { addNewCategory, deleteCategory, editCategory, getAllCategories, getCategory } from '../controller/category.js'
import { isAdmin, isAuthenticated } from '../auth/isAuthenticated.js'


const router = express.Router()


router.get("/categories/all", getAllCategories)

router.get("/category/:id", getCategory)

router.post("/category/create", isAuthenticated, isAdmin, addNewCategory)

router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory)

router.put("/category/:id",isAuthenticated,isAdmin, editCategory)



export default router