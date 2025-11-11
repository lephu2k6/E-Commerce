import express from "express";
const router = express.Router()

import {getCategory,PostCategory,deleteCategory} from '../controllers/category.controller.js'

router.get('/' , getCategory )
router.post('/', PostCategory)
router.delete('/:id', deleteCategory)

export default router;
