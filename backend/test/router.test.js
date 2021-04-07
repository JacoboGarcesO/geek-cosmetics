const request = require('supertest');
const app = require('../index');


describe('ARTICULOS', () => {

    it('REGISTRA UN ARTICULO NUEVO', done => {

        const data = {
            descripcion: "Mantequilla Corporal (naranja)", precio: "25000", cantidad: "700"
        }

        request(app)
            .post('/articulo')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err)
                done();
            })
    })

    it('CONSULTAR UN ARTÍCULO POR EL ID', done => {
        request(app)
            .get('/articulo/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([{ id: 1, descripcion: "Foam", precio: 25000, cantidad: 523 }])
            .end(err => {
                if (err) return done(err)
                done();
            })
    })

    it('CONSULTAR TODOS LOS ARTICULOS', done => {
        request(app)
            .get('/articulos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(
                [
                    { id: 1, descripcion: 'Foam', precio: 25000, cantidad: 523 },
                    { id: 2, descripcion: 'Carbón Activado WIKI', precio: 18000, cantidad: 300 },
                    { id: 3, descripcion: 'DepilYA', precio: 10000, cantidad: 1000 },
                    { id: 4, descripcion: 'Mantequilla Corporal (durazno)', precio: 25000, cantidad: 1000 },
                    { id: 5, descripcion: 'Bronceador', precio: 40000, cantidad: 250 },
                    { id: 6, descripcion: 'Antiestrias', precio: 35000, cantidad: 300 },
                    { id: 7, descripcion: 'Despigmentante Intimo', precio: 40000, cantidad: 500 },
                    { id: 8, descripcion: 'Despigmentante Facial', precio: 35000, cantidad: 365 },
                    { id: 9, descripcion: 'Dermatónico', precio: 40000, cantidad: 500 },
                    { id: 10, descripcion: 'Mantequilla Corporal (frutos rojos)', precio: 25000, cantidad: 2000 },
                    { id: 11, descripcion: 'Mantequilla Corporal (naranja)', precio: 25000, cantidad: 700 }
                ]
            )
            .end(err => {
                if (err) return done(err)
                done();
            })
    })

    it('DECREMENTAR UNIDADES DE UN ARTICULO', done => {
        const data = {
            id: 1, descripcion: "Foam", precio: 25000, unidades_compradas: 4, cantidad: 523
        }

        request(app)
            .put('/articulo')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err)
                done();
            })

    })
})


describe('COMPRAS', () => {

    it('REGISTRAR UNA NUEVA COMPRA', done => {
        const data = {
            nombre_comprador: "ALEJANDRO CARDONA", total_pago: 1000000.50
        }

        request(app)
            .post('/compra')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err)
                done();
            })
    })

    it('CONSULTAR UNA COMPRA CON SUS ARTICULOS', done => {
        request(app)
            .get('/compra/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(
                {
                    "resultado": [
                        {
                            "id": 1,
                            "nombre_comprador": "JACOBO GARCES OQUENDO",
                            "fecha_compra": "2021-04-07T23:19:27.000Z",
                            "total_pago": "50001"
                        }
                    ],
                    "result": [
                        {
                            "id": 1,
                            "id_articulo": 1,
                            "id_compra": 1,
                            "nombre_articulo": "Foam",
                            "cantidad": 2,
                            "subtotal": "40000"
                        },
                        {
                            "id": 2,
                            "id_articulo": 2,
                            "id_compra": 1,
                            "nombre_articulo": "Carbón Activado WIKI",
                            "cantidad": 4,
                            "subtotal": "60000"
                        }
                    ]
                }
            )
            .end(err => {
                if (err) return done(err)
                done();
            })
    })

    it('CANTIDAD DE COMPRAS', done => {
        request(app)
            .get('/compras')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([{ cantidad: 2 }])
            .end(err => {
                if (err) return done(err)
                done();
            })
    })
})

describe('ARTICULOS EN COMPRAS', () => {

    it('REGISTRAR ARTICULO EN UNA COMPRA', done => {
        const data = {
            id_articulo: 1, id_compra: 1, nombre_articulo: "Foam", cantidad: 4, subtotal: 40000
        }

        request(app)
            .post('/articulo-compra')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err)
                done();
            })
    })

    it('ELIMINAR ARTICULO DE UNA COMPRA', done => {
        request(app)
            .delete('/articulo-compra/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err)
                done();
            })
    })
})