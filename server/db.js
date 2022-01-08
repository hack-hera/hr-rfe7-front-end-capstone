require('dotenv').config();
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    logging: false,
  }
);
// var sequelize = new Sequelize('products', 'root', '', {
//   dialect: 'mysql',
//   host: 'localhost',
//   logging: false,
// });

const Product = sequelize.define('Product', {
  product_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  slogan: Sequelize.STRING,
  description: Sequelize.STRING(1024),
  category: Sequelize.STRING,
  default_price: Sequelize.STRING,
  features: Sequelize.JSON,
  styles: Sequelize.JSON,
});

const Review = sequelize.define('Review', {
  product_id: Sequelize.INTEGER,
  ratings: Sequelize.JSON,
  recommended: Sequelize.JSON,
  characteristics: Sequelize.JSON,
  numReviews: Sequelize.INTEGER,
  reviews: Sequelize.JSON,
});

const Related = sequelize.define('Related', {
  product_id: Sequelize.INTEGER,
  related_product_ids: Sequelize.JSON,
  related: Sequelize.JSON,
  ratings: Sequelize.JSON,
});

const Question = sequelize.define('Question', {
  product_id: Sequelize.INTEGER,
  results: Sequelize.JSON,
});

module.exports = { sequelize, Product, Review, Related, Question };
