import { db } from "../../config/db.config.js";

//tambah produk baru
export const createProduct = async (data) => {
  const { name, description, price, condition, size, brand, stock } = data;
  const { rows } = await db.query(
    `INSERT INTO products (name, description, price, condition, size, brand, stock)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, description, price, condition, size, brand, stock],
  );

  return rows[0];
};

//update produk by id
export const updateProduct = async (id, data) => {
  const { name, description, price, condition, size, brand, stock, is_active } =
    data;
  const { rows } = await db.query(
    `UPDATE products
     SET name=$1, description=$2, price=$3, condition=$4, size=$5, brand=$6, stock=$7, is_active=$8, updated_at=NOW()
     WHERE id=$9 AND is_active IS NOT NULL
     RETURNING *`,
    [name, description, price, condition, size, brand, stock, is_active, id],
  );
  return rows[0];
};

//get produk by id (yang belum dihapus)
export const getProductById = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM products WHERE id=$1 AND is_deleted=false`,
    [id],
  );
  return rows[0];
};

//hitung total halaman untuk pagination
export const getPages = async (limit) => {
  const { rows } = await db.query(
    `SELECT CEIL(COUNT(*)::decimal / $1) AS total_pages FROM products WHERE is_deleted=false`,
    [limit],
  );
  return rows[0];
};

//get semua produk dengan pagination
export const getProducts = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const { rows } = await db.query(
    `SELECT * FROM products WHERE is_deleted=false ORDER BY id LIMIT $1 OFFSET $2`,
    [limit, offset],
  );
  return rows;
};

//delete produk
export const deleteProduct = async (id) => {
  await db.query(
    `UPDATE products SET is_deleted=true, updated_at=NOW() WHERE id=$1`,
    [id],
  );
};

//delete semua produk
export const deleteAllProducts = async () => {
  await db.query(
    "UPDATE products SET is_deleted=true, updated_at=NOW()"
  );
};