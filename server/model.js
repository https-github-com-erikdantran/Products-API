const mysql = require('mysql2');
const connection = mysql.createConnection({
  user: 'root',
  database: 'SDC'
});


module.exports = {
  getAllProducts: (data, cb) => {
    let queryString = 'Select * from products where id >= 1 and id <= 5';
    let queryParams = '';
    connection.query(queryString, (err, results) => {
      if (err) {
        throw err;
      } else {
        // let data = [];
        // for (let i = 0; i < results.length; i++) {
        //   var obj = {
        //     id: results[i].id,
        //     name: results[i].product_name,
        //     slogan: results[i].slogan,
        //     description: results[i].description,
        //     category: results[i].category,
        //     default_price: results[i].default_price
        //   }
        //   data.push(obj)
        // }
        // console.log(results)
        cb(results)
      }
    })
  },

  getProduct: (id, cb) => {
    let queryString = 'select * from products, features where products.id = ? and features.productId = ?';
    let queryParams = [id,id];
    connection.query(queryString, queryParams, (err, results) => {
      if (err) {
        throw err;
      } else {
        let data = {
          id: id,
          name: results[0].name,
          slogan: results[0].slogan,
          description: results[0].description,
          category: results[0].category,
          default_price: results[0].default_price,
          features: []
        };
        for (let i = 0; i < results.length; i++) {
          var obj = {
            feature: results[i].feature,
            value: results[i].feature_value
          }
          data.features.push(obj)
        };
        cb(data)
      }
    })
  },

  getProductStyles: (id, cb) => {
    let queryString = 'select * from styles where productId = ?';
    let queryParams = [id];
    connection.query(queryString, queryParams, (err, results) => {
      if (err) {
        throw err;
      } else {
        //console.log(results)
        let data = {
          product_id: id,
          results: []
        };

        let photoQueryString = 'select * from photos where style_id >= ? and style_id <= ?';
        let photoQueryParams = [results[0].id, results[results.length - 1].id];
        connection.query(photoQueryString, photoQueryParams, (photoErr, photoResults) => {
          if (photoErr) {
            throw photoErr;
          } else {
            let skuQueryString = 'select * from skus where style_id >= ? and style_id <= ?';
            let skuQueryParams = [results[0].id, results[results.length - 1].id];
            connection.query(skuQueryString, skuQueryParams, (skuErr, skuResults) => {
              if (skuErr) {
                throw skuErr;
              } else {
                for (let i = 0; i < results.length; i++) {
                  var obj = {
                    style_id: results[i].id,
                    name: results[i].name,
                    original_price: results[i].original_price,
                    sale_price: results[i].sale_price === 'null' ? 0 : results[i].sale_price,
                    'default?': results[i]['default?'],
                    photos: [],
                    skus: {}
                  }
                  for (let j = 0; j < photoResults.length; j) {
                    if (photoResults[j].style_id === obj.style_id) {
                      var photoObj = {
                        url: photoResults[j].url,
                        thumbnail_url: photoResults[j].thumbnail_url
                      };
                      obj.photos.push(photoObj);
                      photoResults.splice(0, 1);
                    } else {
                      break;
                    }
                  }
                  for (let h = 0; h < skuResults.length; h) {
                    if (skuResults[h].style_id === obj.style_id) {
                      obj.skus[skuResults[h].id] = {
                        quantity: skuResults[h].quantity,
                        size: skuResults[h].size
                      };
                      skuResults.splice(0, 1);
                    } else {
                      break;
                    }
                  }
                  if (obj.photos.length === 0) {
                    obj.photos = [{ 'thumbnail_url': null, 'url': null }]
                  }
                  if (Object.keys(obj.skus).length === 0) {
                    obj.skus = { 'null': { 'quantity': null, 'size': null} }
                  }
                  data.results.push(obj)
                };
                cb(data)
              }
            })
          }
        })
      }
    })
  },

  getRelatedProducts: (id, cb) => {
    let queryString = 'select * from related where current_product_id = ?';
    let queryParams = [id];
    connection.query(queryString, queryParams, (err, results) => {
      if (err) {
        throw err;
      } else {
        console.log(results)
        var arr = []
        for (let i = 0; i < results.length; i++) {
          arr.push(results[i].related_product_id)
        }
        console.log(arr)
        cb(arr)
      }
    })
  }

}