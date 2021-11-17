const app = require('./server/testingServer.js');
const mysql = require('mysql2');
const supertest = require('supertest');
const connection = mysql.createConnection({
  user: 'root',
  database: 'SDC'
});



test("GET /products will retrieve five products", async () => {
  await supertest(app).get("/products")
  .expect(200)
  .then((response) => {
    console.log(response.body)
    expect(response.body.length).toBe(5)
  });
});


afterAll(() => {
  connection.end();
});