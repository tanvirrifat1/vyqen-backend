import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

// Create Category
router.post(
  '/create',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory,
);

// Get All Categories
router.get('/get-all', CategoryController.getAllCategories);

// Get Single Category
router.get('/:id', CategoryController.getSingleCategory);

// Update Category
router.patch(
  '/update/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory,
);

// Delete Category
router.delete('/delete/:id', CategoryController.deleteCategory);

export const CategoryRoutes = router;
