const express = require('express');
const app = express();
const port = 5000;
const {getAllProducts, getProduct, getProductStyles} = require('./model.js')
app.use(express.json());
app.listen(port, () => { console.log(`listening on port ${port}`)})


app.get('/products', (req, res) => {
  console.log('headers', req.headers.authorization)
  getAllProducts(null, (data) => {
    res.send(data)
  })
});

app.get('/products/:product_id', (req, res) => {
  console.log('params', req.params)
  console.log('headers', req.headers.authorization)
  getProduct(req.params.product_id, (data) => {
    res.send(data)
  })
})


app.get('/products/:product_id/styles', (req, res) => {
  console.log('HEY')
  console.log('params', req.params)
  console.log('query', req.query)
  console.log('body', req.body)
  console.log('headers', req.headers.authorization)
  getProductStyles(req.params.product_id, (data) => {
    res.send(data)
  })
})