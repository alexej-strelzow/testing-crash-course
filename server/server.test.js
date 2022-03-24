const request = require('supertest');
const app = require('./server');

describe('test server', () => {
  let server;

  beforeEach(async () => {
    server = await app.listen(4000);
    global.agent = request.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  describe('trains', () => {
    test('responds with status 200 the GET method', () => {
      return request(server)
        .get('/trains')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    test('response has expected number of trains, and each has a name and image', () => {
      return request(server)
        .get('/trains')
        .then((response) => {
          expect(response.body.length).toBe(4);
          response.body.forEach((flavor) => {
            expect(typeof flavor.name).toBe('string');
            expect(typeof flavor.imagePath).toBe('string');
          });
        });
    });
  });

  describe('services', () => {
    test('responds with status 200 the GET method', () => {
      return request(server)
        .get('/services')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    test('response has expected number of services, and each has a name and image', () => {
      return request(server)
        .get('/services')
        .then((response) => {
          expect(response.body.length).toBe(6);
          response.body.forEach((service) => {
            expect(typeof service.name).toBe('string');
            expect(typeof service.imagePath).toBe('string');
          });
        });
    });
  });

  describe('order number generator', () => {
    test('returns 201 for POST', () => {
      return request(app)
        .post('/order')
        .then((response) => {
          expect(response.statusCode).toBe(201);
        });
    });

    test('returns random "order number" for POST', () => {
      return request(app)
        .post('/order')
        .then((response) => {
          const { orderNumber } = response.body;
          expect(orderNumber).toBeLessThan(10000000000);
          expect(orderNumber).toBeGreaterThan(0);
        });
    });
  });
});
