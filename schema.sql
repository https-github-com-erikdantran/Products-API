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
  `default?` INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE skus (
  id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  url VARCHAR(300) NOT NULL,
  thumbnail_url VARCHAR(300) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

CREATE TABLE features (
  id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  feature VARCHAR(50) NOT NULL,
  feature_value VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.

  Load data into database from the command line by typing:

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
