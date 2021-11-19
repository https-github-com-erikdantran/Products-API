const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const {getAllProducts, getProduct, getProductStyles, getRelatedProducts} = require('./model.js')

app.use(express.json());
app.use(cors());

app.get('/products', (req, res) => {
  console.log('/products')
  getAllProducts(null, (data) => {
    if(typeof data === 'number') {
      res.sendStatus(data)
    } else {
      res.send(data)
    }
  })
});

app.get('/products/:product_id', (req, res) => {
  console.log('/products/' + req.params.product_id)
  getProduct(req.params.product_id, (data) => {
    if(typeof data === 'number') {
      res.sendStatus(data)
    } else {
      res.send(data)
    }
  })
})


app.get('/products/:product_id/styles', (req, res) => {
  console.log('/products/' + req.params.product_id + '/styles')
  getProductStyles(req.params.product_id, (data) => {
    if(typeof data === 'number') {
      res.sendStatus(data)
    } else {
      res.send(data)
    }
  })
})

app.get('/products/:product_id/related', (req, res) => {
  console.log('/products/' + req.params.product_id + '/related')
  getRelatedProducts(req.params.product_id, (data) => {
    if(typeof data === 'number') {
      res.sendStatus(data)
    } else {
      res.send(data)
    }
  })
})


app.listen(port, () => { console.log(`listening on port ${port}`)})