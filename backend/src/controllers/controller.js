const { connection } = require('../../config/db_config');

module.exports = {

    ingresarArticulo: (req, res) => {
        try {
            const { descripcion, precio, cantidad } = req.body;

            connection.query(`INSERT INTO articulo (id, descripcion, precio, cantidad)
             VALUES (NULL, "${descripcion}", ${precio}, ${cantidad});`, (err, result) => {
                if (err) {
                    return res.status(400).json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(404).json({ message: "Error de conexión inesperado." });
        }
    },

    consultarArticulo: (req, res) => {
        try {
            const id = req.params.id;
            connection.query(`SELECT * FROM articulo WHERE id=${id};`, (err, result) => {
                if (err) {
                    return res.json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." });
        }
    },

    consultarArticulos: (req, res) => {
        try {
            connection.query(`SELECT * FROM articulo WHERE cantidad>=1;`, (err, result) => {
                if (err) {
                    return res.json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." });
        }
    },

    decrementarUnidades: (req, res) => {
        try {
            const { id, descripcion, precio, unidades_compradas } = req.body;
            const cantidad = req.body.cantidad - unidades_compradas;

            if (cantidad <= 1) {
                return res.status(401).json({ message: "No hay suficientes unidades." })
            }

            connection.query(`UPDATE articulo SET id=${id}, descripcion='${descripcion}', precio=${precio}, cantidad=${cantidad} WHERE id=${id};`, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." });
        }
    },

    ingresarCompra: (req, res) => {
        try {
            const { id, nombre_comprador, total_pago } = req.body;

            connection.query(`INSERT INTO compra (id, nombre_comprador, fecha_compra, total_pago) VALUES 
            (${id}, "${nombre_comprador}", CURRENT_TIMESTAMP, ${total_pago});`, (err, result) => {
                if (err) {
                    return res.status(400).json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." })
        }
    },

    consultarCompra: (req, res) => {
        try {
            const id = req.params.id;

            connection.query(`SELECT * FROM compra WHERE id=${id};`, (error, resultado) => {
                if (error) {
                    return res.json({ message: "Error inesperado." });
                }
                connection.query(`SELECT * FROM articulo_compra WHERE id_compra=${id};`, (err, result) => {
                    if (err) {
                        return res.json({ message: "Error inesperado." });
                    }
                    return res.json({ resultado, result });
                })
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." });
        }
    },

    ingresarCompraArticulo: (req, res) => {
        try {
            const { id_articulo, id_compra, nombre_articulo, precio, unidades_compradas, subtotal } = req.body;
            const cantidad = req.body.cantidad - unidades_compradas;

            if (cantidad <= 1) {
                return res.json({ message: "No hay suficientes unidades." })
            }

            connection.query(`UPDATE articulo SET id=${id_articulo}, descripcion='${nombre_articulo}', precio=${precio}, cantidad=${cantidad} WHERE id=${id_articulo};`, (err) => {
                if (err) {
                    return res.status(404).json({ message: "Error inesperado." });
                }
                connection.query(`INSERT INTO articulo_compra (id, id_articulo, id_compra, nombre_articulo, cantidad, subtotal) VALUES 
            (NULL, ${id_articulo}, ${id_compra}, '${nombre_articulo}', ${unidades_compradas}, ${subtotal});`, (err, result) => {
                    if (err) {
                        return res.status(400).json({ message: "Error inesperado." });
                    }
                    return res.json(result)
                })
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." });
        }
    },

    borrarArticuloCompra: (req, res) => {
        try {
            const id = req.params.id;

            connection.query(`DELETE FROM articulo_compra WHERE articulo_compra.id = ${id}`, (err, result) => {
                if (err) {
                    return res.json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." });
        }
    },

    consultarCantidadCompras: (req, res) => {
        try {
            connection.query(`SELECT MAX(id) AS id FROM compra`, (err, result) => {
                if (err) {
                    return res.json({ message: "Error inesperado." });
                }
                return res.json(result);
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." })
        }
    },

    actualizarPago: (req, res) => {
        try {
            const id_compra = req.params.id;
            connection.query(`SELECT SUM(subtotal) AS total FROM articulo_compra WHERE id_compra=${id_compra};`, (err, resultPago) => {
                if (err) {
                    return res.json({ message: "Error inesperado." });
                }
                let pago = resultPago[0]['total'];
                pago = parseFloat(pago) + parseFloat(pago * 0.19);
                connection.query(`UPDATE compra SET total_pago = ${pago} WHERE compra.id = ${id_compra};`, (err, result) => {
                    if (err) {
                        return res.json({ message: "Error inesperado." });
                    }
                    return res.json(result);
                })
            })
        } catch (e) {
            return res.status(500).json({ message: "Error de conexión inesperado." })
        }
    }
}