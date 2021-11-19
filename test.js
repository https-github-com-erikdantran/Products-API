const app = require('./server/testingServer.js');
const supertest = require('supertest');

test('GET /products will retrieve the first five products', async () => {
  await supertest(app).get('/products')
  .expect(200)
  .then((res) => {
    expect(res.body.length).toBe(5)
    expect(res.body[0].name).toBe('Camo Onesie')
    expect(res.body[1].slogan).toBe('You\'ve got to wear shades')
    expect(res.body[2].category).toBe('Pants')
    expect(res.body[3].description).toBe('I\'ll tell you how great they are after I nap for a bit.')
    expect(res.body[4].default_price).toBe(99)
  });
});

test('GET /products/:id will return a single product with more information', async () => {
  await supertest(app).get('/products/7')
  .expect(200)
  .then((res) => {
    expect(typeof res.body === 'object').toBe(true)
    expect(res.body.name).toBe('Blues Suede Shoes')
    expect(res.body).toHaveProperty('category')
    expect(res.body.features.length).toBe(3)
  });
});

test('GET /products/:id with an id that does not exist will return a 404 res', async () => {
  await supertest(app).get('/products/10000000')
  .expect(404)
});

test('GET /products/:id/styles will return an object with styles in the results array property', async () => {
  await supertest(app).get('/products/7/styles')
  .expect(200)
  .then((res) => {
    expect(typeof res.body === 'object').toBe(true)
    expect(res.body.results.length).toBe(5)
    expect(res.body.results[0].style_id).toBe(32)
    expect(res.body.results[0].photos[0]).toHaveProperty('url')
    expect(Object.keys(res.body.results[0].skus).length).toBe(11)
  });
});

test('GET /products/:id/related will return a array the id\'s of related products', async () => {
  await supertest(app).get('/products/7/related')
  .expect(200)
  .then((res) => {
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(9)
  });
});