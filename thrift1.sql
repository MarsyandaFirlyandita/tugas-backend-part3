-- Database: thrift1

-- DROP DATABASE IF EXISTS thrift1;

CREATE DATABASE thrift1
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Indonesian_Indonesia.1252'
    LC_CTYPE = 'Indonesian_Indonesia.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS products (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    description TEXT,
    price       NUMERIC(12,2) NOT NULL CHECK (price > 0),
    condition   VARCHAR(10)  NOT NULL CHECK (condition IN ('baru', 'baik', 'cukup')),
    size        VARCHAR(10),
    brand       VARCHAR(50),
    stock       INT          NOT NULL DEFAULT 1 CHECK (stock >= 0),
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    is_deleted  BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, condition, size, brand, stock) VALUES
    ('Kemeja Flanel Vintage',  'Kemeja flanel kotak-kotak, kondisi bagus',   75000,  'baik',     'M',  'Unbranded', 1),
    ('Jaket Denim 90s',        'Jaket denim polos, sedikit fading keren',    120000, 'cukup',     'L',  'Levis',     1),
    ('Celana Cargo Hijau',     'Celana cargo army green, banyak saku',       95000,  'baru', '32', 'H&M',       2),
    ('Tote Bag Canvas Besar',  'Tote bag canvas putih polos, bersih',        45000,  'baru', '-',  'Cotton On', 3),
    ('Sneakers Putih Casual',  'Sepatu sneakers putih, sol masih bagus',     150000, 'baik',     '40', 'Vans',      1);

SELECT * FROM products;