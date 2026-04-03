import { Router } from "express";
import * as productController from "./product.controller.js";

const router = Router();

//POST - TAMBAH PRODUK BARU
router.post("/", productController.createProduct);

//PUT - UPDATE PRODUK BY ID
router.put("/:id", productController.updateProduct);

//GET - AMBIL SEMUA PRODUK (pagination)
router.get("/", productController.getProducts);

//GET - AMBIL PRODUK BY ID
router.get("/:id", productController.getProductById);

//DELETE - HAPUS SEMUA
router.delete("/", productController.deleteAllProducts);

//DELETE - HAPUS PRODUK BY ID
router.delete("/:id", productController.deleteProduct);



export default router;
