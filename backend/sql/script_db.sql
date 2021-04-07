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

INSERT INTO `articulo` (`id`, `descripcion`, `precio`, `cantidad`) VALUES 
(NULL, 'Foam', '25000', '523'), 
(NULL, 'Carbón Activado WIKI', '18000', '300'), 
(NULL, 'DepilYA', '10000', '1000'), 
(NULL, 'Mantequilla Corporal (durazno)', '25000', '1000'), 
(NULL, 'Bronceador', '40000', '250'), 
(NULL, 'Antiestrias', '35000', '300'), 
(NULL, 'Despigmentante Intimo', '40000', '500'), 
(NULL, 'Despigmentante Facial', '35000', '365'), 
(NULL, 'Dermatónico', '40000', '500'), 
(NULL, 'Mantequilla Corporal (frutos rojos)', '25000', '2000'), 
(NULL, 'Mantequilla Corporal (naranja)', '25000', '700');

INSERT INTO `compra` (`id`, `nombre_comprador`, `fecha_compra`, `total_pago`) VALUES 
(NULL, 'JACOBO GARCES OQUENDO', CURRENT_TIMESTAMP, '50000.5');

INSERT INTO `articulo_compra` (`id`, `id_articulo`, `id_compra`, `cantidad`, `subtotal`) VALUES 
(NULL, '1', '1', '2', '40000'), 
(NULL, '2', '1', '4', '60000');