DROP DATABASE IF EXISTS SDC;

CREATE DATABASE SDC;

USE SDC;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  slogan VARCHAR(300) NOT NULL,
  description VARCHAR(300) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE related (
  id INT NOT NULL AUTO_INCREMENT,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (current_product_id) REFERENCES products(id),
  FOREIGN KEY (related_product_id) REFERENCES products(id)
);

CREATE TABLE styles (
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  sale_price VARCHAR(20) NOT NULL,
  original_price VARCHAR(20) NOT NULL,
  `default` INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

-- change column default? in database to default

CREATE TABLE skus (
  skus_id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (skus_id),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

-- change column id in database to skus_id

CREATE TABLE photos (
  photos_id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  url VARCHAR(300) NOT NULL,
  thumbnail_url VARCHAR(300) NOT NULL,
  PRIMARY KEY (photos_id),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

-- change column id in database to photos_id

CREATE TABLE features (
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  feature VARCHAR(50) NOT NULL,
  feature_value VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);


-- select * from styles s
-- left join photos p on s.id = p.style_id
-- left join skus k on s.id = k.style_id
-- where s.productId = 2;

-- select s.id, s.`name`, s.sale_price, s.original_price, s.`default`, group_concat(distinct k.size) sizes, group_concat(distinct k.quantity) quantities, group_concat(distinct p.url) urls, group_concat(distinct p.thumbnail_url) thumbnail_urls from styles s left join skus k on s.id = k.style_id left join photos p on s.id = p.style_id where s.productId = 1 group by s.id, s.`name`, s.sale_price, s.original_price, s.`default`;


-- select s.id, s.`name`, s.sale_price, s.original_price, s.`default`,
-- group_concat(distinct k.size) sizes,
-- group_concat(distinct k.quantity) quantities,
-- group_concat(distinct p.url) urls,
-- group_concat(distinct p.thumbnail_url) thumbnail_urls
-- from styles s
-- left join skus k on s.id = k.style_id
-- left join photos p on s.id = p.style_id
-- where s.productId = 1
-- group by s.id, s.`name`, s.sale_price, s.original_price, s.`default`;


-- select * from (select s.id, s.`name`, s.sale_price, s.original_price, s.`default`, group_concat(k.size) sizes, group_concat(k.quantity) quantities from styles s left join skus k on s.id = k.style_id where s.productId = 1 group by s.id, s.`name`, s.sale_price, s.original_price, s.`default`) x join (select s.id, group_concat(p.url) urls, group_concat(p.thumbnail_url) thumbnail_urls from styles s left join photos p on s.id = p.style_id where s.productId = 1 group by s.id) y where x.id = y.id;

-- select s.id, s.`name`, s.sale_price, s.original_price, s.`default?`,
-- group_concat(k.size) sizes,
-- group_concat(k.quantity) quantities
-- from styles s
-- join skus k on s.id = k.style_id
-- where s.productId = 1
-- group by id;

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.

  Load data into database from the command line by typing (only one block of code at a time):

  LOAD DATA LOCAL INFILE '/Users/taite510/work/SDC-Products/source-data/product.csv' INTO TABLE products
  FIELDS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, `name`, slogan, description, category, default_price);

  LOAD DATA LOCAL INFILE '/Users/taite510/work/SDC-Products/source-data/related.csv' INTO TABLE related
  FIELDS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, current_product_id, related_product_id);

  LOAD DATA LOCAL INFILE '/Users/taite510/work/SDC-Products/source-data/styles.csv' INTO TABLE styles
  FIELDS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, productId, `name`, sale_price, original_price, `default?`);


  LOAD DATA LOCAL INFILE '/Users/taite510/work/SDC-Products/source-data/skus.csv' INTO TABLE skus
  FIELDS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, style_id, size, quantity);

  LOAD DATA LOCAL INFILE '/Users/taite510/work/SDC-Products/source-data/photos.csv' INTO TABLE photos
  FIELDS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, style_id, url, thumbnail_url);

  LOAD DATA LOCAL INFILE '/Users/taite510/work/SDC-Products/source-data/features.csv' INTO TABLE features
  FIELDS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, productId, feature, feature_value);

 */


