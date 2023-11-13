import express from 'express'
import { addNewCategory, deleteCategory, editCategory, getAllCategories, getCategory } from '../controller/category.js'


const router = express.Router()


router.get("/categories/all", getAllCategories)

router.post("/category/create", addNewCategory)

router.get("/category/:id", getCategory)

router.delete("/category/:id", deleteCategory)

router.put("/category/:id", editCategory)



export default router