import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (category: ICategory) => {
  const name = category.name?.trim();
  if (!name) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category name is required!');
  }

  const isExist = await Category.findOne({
    name: { $regex: `^${name}$`, $options: 'i' },
  });

  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Category already exists!');
  }

  const result = await Category.create({ name });
  return result;
};

const getAllCategories = async (query?: Record<string, unknown> | string) => {
  const filter: Record<string, unknown> = {};

  let search: string | undefined;
  if (typeof query === 'string') {
    search = query.trim();
  } else if (query) {
    const term = (query.searchTerm as string) || (query.name as string);
    if (term) {
      search = term.trim();
    }
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const result = await Category.find(filter).sort({ createdAt: -1 });
  return result;
};

const getSingleCategory = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Category ID!');
  }

  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  return isExist;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Category ID!');
  }

  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  if (payload.name) {
    const trimmedName = payload.name.trim();
    if (!trimmedName) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Category name cannot be empty!',
      );
    }

    const isDuplicate = await Category.findOne({
      _id: { $ne: id },
      name: { $regex: `^${trimmedName}$`, $options: 'i' },
    });

    if (isDuplicate) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        'Category with this name already exists!',
      );
    }

    payload.name = trimmedName;
  }

  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCategory = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Category ID!');
  }

  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
