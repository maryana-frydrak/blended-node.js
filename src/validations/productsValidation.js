import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

const checkObjectId = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid id');
  }
  return value;
};

export const getAllProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    search: Joi.string().allow('').optional(),
  }),
};

export const getProductByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(checkObjectId).required(),
  }),
};

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    category: Joi.string()
      .valid(...CATEGORIES)
      .required(),
    description: Joi.string().required(),
  }),
};

export const updateProductSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(checkObjectId).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).optional(),
    price: Joi.number().optional(),
    category: Joi.string()
      .valid(...CATEGORIES)
      .optional(),
    description: Joi.string().optional(),
  }).min(1),
};

export const deleteProductSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(checkObjectId).required(),
  }),
};
