const { describe, it, before } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Suite Test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP Status 200', async () => {
            const response = await request(app)
                .get('/contact')
                .expect(200)
            assert.deepStrictEqual(response.text, 'contact us page');
        })
    });

    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(app)
                .get('/hi')
                .expect(200)
            assert.deepStrictEqual(response.text, 'Hello World');
        })
    });

    describe('/login', function () {
        it('should login successfully on the login route and return HTTP Status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({ username: "CleoSilva", password: "123" })
                .expect(200);
            assert.deepStrictEqual(response.text, 'Loggin has succeeded!')
        });

        it('should unauthorized a request when requesting it using wrong credentials HTTP Status 401', async () => {
            setTimeout(async () => {
                const response = await request(app)
                    .post('/login')
                    .send({ username: "LucasDaSilva", password: "123" })
                    .expect(401);

                assert.ok(response.unauthorized);
                assert.deepStrictEqual(response.text, 'Loggin failed!')
            }, 5000)

        })
    })
})