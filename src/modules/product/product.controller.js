import * as productService from "./product.service.js";


import {
  createProductSchema,
  updateProductSchema,
  paginationSchema,
} from "./product.validation.js";

//POST /api/products
export const createProduct = async (req, res) => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(data);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`\n UPDATE BY ID ${id}`);
    const data = updateProductSchema.parse(req.body);

    const product = await productService.updateProduct(id, data);

    res.json({
      ...product,
      price: Number(product.price)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET /all/products?page=1&limit=10
export const getProducts = async (req, res) => {
  try {
    console.log("query:", req.query);
    const { page, limit } = paginationSchema.parse(req.query);
    const result = await productService.getProductsWithPagination(page, limit);

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`\n  DELETE BY ID ${id}`);
    await productService.deleteProduct(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /products (hapus semua)
export const deleteAllProducts = async (req, res) => {
  try {
    await productService.deleteAllProductsService();

    res.json({
      message: "All products deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};