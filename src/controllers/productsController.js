import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getAllProducts = async (req, res) => {
  const { category, searsh, page = 1, perPage = 10 } = req.query;

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const skip = (pageNum - 1) * perPageNum;

  const myQuery = Product.find({ userId: req.user._id });

  if (category) {
    myQuery.where({ category });
  }

  if (searsh) {
    myQuery.where({
      $or: [
        { name: { $regect: searsh, $options: 'i' } },
        { description: { $regect: searsh, $options: 'i' } },
      ],
    });
  }

  const [totalItems, products] = await Promise.all([
    myQuery.clone().countDocuments(),
    myQuery.skip(skip).limit(perPageNum).exec(),
  ]);

  const totalPages = Math.ceil(totalItems / perPageNum);

  res.status(200).json({
    page: pageNum,
    perPage: perPageNum,
    totalItems,
    totalPages,
    products,
  });
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, userId: req.user._id });

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate(
    { _id: productId, userId: req.user._id },
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({
    _id: productId,
    userId: req.user._id,
  });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};
