import * as productRepository from "./product.repository.js";

export const createProduct = async (data) => {
  return await productRepository.createProduct(data);
};

export const updateProduct = async (id, data) => {
  const existing = await productRepository.getProductById(id);
  if (!existing) {
    throw new Error("Product is not Found!");
  }

  return await productRepository.updateProduct(id, data);
};

export const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const getProductsWithPagination = async (page, limit) => {
  const products = await productRepository.getProducts(page, limit);
  const totalData = await productRepository.getPages(limit);
  return {
    page,
    limit,
    total_pages: Number(totalData.total_pages),
    data: products,
  };
};

export const deleteProduct = async (id) => {
  const existing = await productRepository.getProductById(id);
  if (!existing) {
    throw new Error("Product not found");
  }

  await productRepository.deleteProduct(id);
};

export const deleteAllProductsService = async () => {
  return await productRepository.deleteAllProducts();
};