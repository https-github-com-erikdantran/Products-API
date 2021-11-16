const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.listen(port, () => { console.log(`listening on port ${port}`)})


app.get('/products', (req, res) => {
  console.log('HEY')
  console.log('params', req.params)
  console.log('query', req.query)
  console.log('body', req.body)
  console.log('headers', req.headers.authorization)
  res.send('HEY')
})