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
      } else if (results.length === 0) {
        let justProudctQueryString = 'select * from products where id = ?'
        connection.query(justProudctQueryString, queryParams, (err, productResults) => {
          if (err) {
            throw err
          } else if (productResults.length === 0) {
            return cb(404)
          } else {
            let data = {
              id: id,
              name: productResults[0].name,
              slogan: productResults[0].slogan,
              description: productResults[0].description,
              category: productResults[0].category,
              default_price: productResults[0].default_price,
              features: []
            };
            cb(data)
          }
        })
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
    let queryString = 'select * from (select s.id, s.`name`, s.sale_price, s.original_price, s.`default`, group_concat(k.size) sizes, group_concat(k.quantity) quantities, group_concat(k.skus_id) skuIds from styles s left join skus k on s.id = k.style_id where s.productId = ? group by s.id, s.`name`, s.sale_price, s.original_price, s.`default`) x join (select s.id, group_concat(p.url) urls, group_concat(p.thumbnail_url) thumbnail_urls from styles s left join photos p on s.id = p.style_id where s.productId = ? group by s.id) y where x.id = y.id';
    let queryParams = [id, id];
    let data = {
      product_id: id,
      results: []
    };
    connection.query(queryString, queryParams, (err, results) => {
      if (err) {
        throw err;
      } else if (results.length === 0){
        return cb(data);
      } else {
        for (let i = 0; i < results.length; i++) {
          var obj = {
            style_id: results[i].id,
            name: results[i].name,
            original_price: results[i].original_price,
            sale_price: results[i].sale_price === 'null' ? 0 : results[i].sale_price,
            default: results[i].default,
            photos: [],
            skus: {}
          }
          if (results[i].urls !== null) {
            let photoResults = {
              url: results[i].urls.split(','),
              thumbnail_url: results[i].thumbnail_urls.split(',')
            }
            for (let j = 0; j < photoResults.url.length; j++) {
              var photoObj = {
                url: photoResults.url[j],
                thumbnail_url: photoResults.thumbnail_url[j]
              };
              obj.photos.push(photoObj);
            }
          }
          if (results[i].skuIds !== null) {
            let skuResults = {
              id: results[i].skuIds.split(','),
              size: results[i].sizes.split(','),
              quantity: results[i].quantities.split(',')
            }
            for (let h = 0; h < skuResults.id.length; h++) {
              obj.skus[skuResults.id[h]] = {
                quantity: skuResults.quantity[h],
                size: skuResults.size[h]
              };
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
  },

  getRelatedProducts: (id, cb) => {
    let queryString = 'select * from related where current_product_id = ?';
    let queryParams = [id];
    connection.query(queryString, queryParams, (err, results) => {
      if (err) {
        throw err;
      } else if (results.length === 0) {
        return cb(404)
      } else {
        var arr = []
        for (let i = 0; i < results.length; i++) {
          arr.push(results[i].related_product_id)
        }
        cb(arr)
      }
    })
  }

}