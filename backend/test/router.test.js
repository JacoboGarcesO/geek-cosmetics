const request=require('supertest');
const app=require('../index');

describe('GET /users', ()=>{
    it('responde una lista de todos los usuarios', done=>{
        request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('GET /users/:id', ()=>{
    it('responde una lista de un usuario', done=>{
        request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('responde este json con usser not found', done=>{
        request(app)
        .get('/users/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect('"usser not found"')
        .end(err=>{
            if(err) return done(err);
            done();
        });
    })
})

describe('POST /users', ()=>{
    it('Responde 201 cuando crea usuario', done=>{
        const data = {
            username: "jaco", 
            password: "123456789"
        }
        request(app)
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(err=>{
            if(err) return done(err);
            done();
        })
    })

    it('Responde 400 cuando no crea usuario', done=>{
        const data = {}
        request(app)
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect('"user not created"')
        .end(err=>{
            if(err) return done(err);
            done();
        })
    })
})