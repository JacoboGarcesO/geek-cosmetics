DROP TABLE IF EXISTS articulo;
DROP TABLE IF EXISTS compra;
DROP TABLE IF EXISTS articulo_compra;

CREATE TABLE articulo(
	id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(40) NOT NULL,
    precio INT NOT NULL,
    cantidad INT NOT NULL
);

CREATE TABLE compra(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_comprador VARCHAR(40) NOT NULL,
    fecha_compra DATETIME DEFAULT NOW(),
    cantidad INT NOT NULL,
    total_pago DECIMAL NOT NULL
);

CREATE TABLE articulo_compra(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_articulo INT NOT NULL,
    id_compra INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL NOT NULL,
    FOREIGN KEY(id_articulo) REFERENCES articulo(id),
    FOREIGN KEY(id_compra) REFERENCES compra(id)
        ON DELETE RESTRICT
    	ON UPDATE CASCADE
);
