const { Router } = require('express');
const router = Router();

const {
    ingresarArticulo,
    consultarArticulos,
    ingresarCompra,
    decrementarUnidades,
    consultarCompra,
    consultarArticulo,
    ingresarCompraArticulo,
    borrarArticuloCompra,
    consultarCantidadCompras,
    actualizarPago
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
 *              - nombre_articulo
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
 *              nombre_articulo:
 *                 type: string
 *                 description: Nombre del articulo comprado
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
 *              nombre_articulo: Foam
 *              cantidad: 362
 *              subtotal: 40501
 */

/**
 * @swagger
 * /articulo:
 *  post:
 *      summary: Registrar articulo
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/articulo'                       
 *      responses:
 *          200:
 *              description: Registro exitoso
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/articulo'
 *          400:
 *              description: Error al ingresar la información
 *          404: 
 *              description: Error para conectar con la base de datos 
 */
router.post('/articulo', ingresarArticulo);

/**
 * @swagger
 * /articulo/{id}:
 *  get:
 *      summary: Consultar un solo artículo
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                type: string
 *            required: true
 *            description: id del articulo                     
 *      responses:
 *          200:
 *              description: Articulo retornado / si no encuentra articulo devuelve un array vacío
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/articulo'
 *          500:
 *              description: Error en la base de datos
 */
router.get('/articulo/:id', consultarArticulo);

/**
 * @swagger
 * /compra/{id}:
 *  get:
 *      summary: Consultar una compra junto con sus articulos
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                type: string
 *            required: true
 *            description: id de la compra                     
 *      responses:
 *          200:
 *              description: Retorna una compra con sus articulos / si no encuentra la compra devuelve un array vacío
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/compra'
 */
router.get('/compra/:id', consultarCompra);

/**
 * @swagger
 * /articulo:
 *  put:
 *      summary: Decrementar unidades de un articulo
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/articulo'                  
 *      responses:
 *          200:
 *              description: Retorna las filas afectadas
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/articulo'
 *          401:
 *              description: No hay unidades suficientes
 *          404: 
 *              description: El articulo no se encontró
 *          500:
 *              description: Error en la base de datos
 */
router.put('/articulo', decrementarUnidades);

/**
 * @swagger
 * /articulo-compra/{id}:
 *  delete:
 *      summary: Borrar un articulo de una compra
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                type: string
 *            required: true
 *            description: id del articulo de la compra                     
 *      responses:
 *          200:
 *              description: Retorna las filas afectadas
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/articulo_compra'
 *          500: 
 *              description: Error en la base de datos
 */
router.delete('/articulo-compra/:id', borrarArticuloCompra);

/**
 * @swagger
 * /articulos:
 *  get:
 *      summary: Consultar los artículos               
 *      responses:
 *          200:
 *              description: Retorna un array de articulos
 *              content:
 *                  application/json: 
 *                          schema:
 *                              type: array
 *                              $ref: '#/components/schemas/articulo'
 *          500:
 *              description: Error en la base de datos
 */
router.get('/articulos', consultarArticulos);

/**
 * @swagger
 * /compras:
 *  get:
 *      summary: Consultar la cantidad de compras             
 *      responses:
 *          200:
 *              description: Retorna el número de compras
 *              content:
 *                  application/json: 
 *                          schema:
 *                              example:
 *                                  cantidad: 4
 *          500:
 *              description: Error en la base de datos
 */
router.get('/compras', consultarCantidadCompras);

/**
 * @swagger
 * /compra:
 *  post:
 *      summary: Registrar compra
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/compra'                       
 *      responses:
 *          200:
 *              description: Registro exitoso
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/compra'
 *          400:
 *              description: Error al ingresar la información
 *          500: 
 *              description: Error para conectar con la base de datos 
 */
router.post('/compra', ingresarCompra);

/**
 * @swagger
 * /articulo-compra:
 *  post:
 *      summary: Registrar articulo en una compra
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/articulo_compra'                       
 *      responses:
 *          200:
 *              description: Registro exitoso
 *              content:
 *                  application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/articulo_compra'
 *          400:
 *              description: Error al ingresar la información
 *          500: 
 *              description: Error para conectar con la base de datos 
 */
router.post('/articulo-compra', ingresarCompraArticulo);

router.get('/actualizar-pago/:id', actualizarPago)

module.exports = router;