import express from 'express'
import { addNewCategory, deleteCategory, editCategory, getAllCategories, getCategory } from '../controller/category.js'


const router = express.Router()


router.get("/categories/all", getAllCategories)
router.get("/category/:id", getCategory)




export default router