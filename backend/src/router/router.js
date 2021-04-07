const { Router } = require('express');
const router = Router();

const { 
    ingresarArticulo,
    consultarArticulos, 
    ingresarCompra, 
    decrementarUnidades, 
    consultarCompra,
    consultarArticulo
} = require('../controllers/controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     articulo:
 *          type: object
 *          required: 
 *              - descripcion
 *              - precio
 *              - cantidad
 *          properties:
 *              id:
 *                 type: integer
 *                 description: Identificador de un artículo.
 *              descripcion: 
 *                 type: string
 *                 description: Información adicional sobre el artículo.
 *              precio: 
 *                 type: integer
 *                 description: Valor a pagar por el artículo.
 *              cantidad: 
 *                 type: integer
 *                 description: Cantidad de unidades disponibles de dicho artículo.
 *          example:
 *              id: 1
 *              descripcion: Crema de durazno para la piel
 *              precio: 40000
 *              cantidad: 362
 *     
 *     compra:
 *          type: object
 *          required: 
 *              - nombre_comprador
 *              - fecha_compra
 *              - total_pago
 *          properties:
 *              id:
 *                 type: integer
 *                 description: Identificador de la compra.
 *              nombre_comprador: 
 *                 type: string
 *                 description: Persona que realiza la compra.
 *              fecha_compra: 
 *                 type: date
 *                 description: Fecha en que se realiza la compra.
 *              total_pago: 
 *                 type: float
 *                 description: Cantidad de dinero total que se debe pagar por la compra.
 *          example:
 *              id: 1
 *              nombre_comprador: Jacobo
 *              fecha_compra: 01-12-2021 23:59:59.997
 *              total_pago: 87000.43
 * 
 *     articulo_compra:
 *          type: object
 *          required: 
 *              - id_articulo
 *              - id_compra
 *              - cantidad
 *              - subtotal
 *          properties:
 *              id:
 *                 type: integer
 *                 description: Identificador de la entidad relacional articulo_compra.
 *              id_articulo: 
 *                 type: integer
 *                 description: Identificador del articulo que está en una compra.
 *              id_compra: 
 *                 type: integer
 *                 description: Identificador de una compra.
 *              cantidad: 
 *                 type: integer
 *                 description: Cantidad de unidades de dicho artículo.
 *              subtotal: 
 *                 type: float
 *                 description: Cantidad de dinero dispuesto a pagar por el artículo incluído en la compra multiplicado por la cantidad de unidades.
 *          example:
 *              id: 1
 *              id_articulo: 1
 *              id_compra: 1
 *              cantidad: 362
 *              subtotal: 40501.43
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: Retorna el texto Conexión exitosa
 *      responses:
 *          200:
 *              description: Conexión exitosa de prueba
 *              content:
 *                  application/json: 
 *                          schema:
 *                              type: json
 *                              items: #/components/schemas/articulo
 *                           
 */
router.get("/", (req, res) => {
    return res.json('Conexión exitosa');
})

router.post('/articulo', ingresarArticulo);
router.get('/articulo/:id', consultarArticulo);
router.get('/articulos', consultarArticulos);
router.post('/compra', ingresarCompra);
router.put('/articulo', decrementarUnidades);
router.get('/compra/:id', consultarCompra);


module.exports = router;