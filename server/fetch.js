const { sequelize, Product, Review, Related, Question } = require('./db');
const axios = require('axios');
const { github_token, campus } = require('../client/env/config.js');
const host = `https://app-hrsei-api.herokuapp.com/api/fec2/${campus}`;
const headers = {
  headers: {
    Authorization: `${github_token}`,
  },
};

const apiCalls = [];
const logAPICall = () => apiCalls.push(new Date().getTime() / 1000);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async (url) => {
  logAPICall();
  let current = new Date().getTime() / 1000;
  let numCalls = apiCalls.filter((x) => x > current - 60).length;

  console.log('...api call', numCalls, apiCalls.length);

  while (numCalls > 100) {
    console.log('......throttling');
    await sleep(30000);
    current = new Date().getTime() / 1000;
    numCalls = apiCalls.filter((x) => x > current - 60).length;
  }

  let res = await axios.get(url, headers);
  return res.data;
};

const insertOrUpdate = async (model, product_id, data) => {
  let found = await model.findAll({ where: { product_id } });
  if (found.length > 0) {
    await model.update(data, { where: { product_id } });
  } else {
    await model.create(data);
  }
};

/*****************************
 * Get API
 ****************************/

const getProducts = async () => {
  let cached = await sequelize.query(
    'select product_id as id, name, description from "Products" order by product_id limit 100;'
  );
  return cached[0];
};

const getProduct = async ({ product_id }) => {
  let productUrl = `${host}/products/${product_id}`;
  let stylesUrl = `${host}/products/${product_id}/styles`;
  try {
    let cached = await Product.findOne({ where: { product_id } });
    if (cached) {
      return cached.dataValues;
    }

    let productData = await fetchData(productUrl);
    delete productData.created_at;
    delete productData.updated_at;
    productData.product_id = productData.id;
    delete productData.id;
    let stylesData = await fetchData(stylesUrl);
    productData.styles = stylesData.results;
    await insertOrUpdate(Product, product_id, productData);
    return productData;
  } catch (err) {
    console.log(err.message);
  }
};

getReview = async ({ product_id }) => {
  const metaUrl = `${host}/reviews/meta?product_id=${product_id}`;
  const reviewUrl = `${host}/reviews?product_id=${product_id}&count=100&page=1&sort=newest`;

  try {
    let cached = await Review.findOne({ where: { product_id } });
    if (cached) {
      return cached.dataValues;
    }

    const data = await fetchData(metaUrl);
    const reviewData = await fetchData(reviewUrl);
    data.numReviews = reviewData.results.length;
    data.reviews = reviewData.results;
    data.product_id = parseInt(data.product_id);
    await insertOrUpdate(Review, product_id, data);

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

getRelated = async ({ product_id }) => {
  let url = `${host}/products/${product_id}/related`;

  try {
    let cached = await Related.findOne({ where: { product_id } });
    if (cached) {
      return cached.dataValues;
    }
    const data = await fetchData(url);
    let related = data.filter((x, i) => data.indexOf(x) === i && x !== product_id);

    let obj = {
      product_id,
      related_product_ids: related,
      related: [],
      ratings: [],
    };

    for (let i = 0; i < related.length; i++) {
      let temp = await getProduct({ product_id: related[i] });
      obj.related.push(temp);
      let temp2 = await getReview({ product_id: related[i] });
      delete temp2.reviews;
      obj.ratings.push(temp2);
    }

    await insertOrUpdate(Related, product_id, obj);
    return obj;
  } catch (err) {
    console.log(err.message);
  }
};

getQuestions = async ({ product_id }) => {
  const url = `${host}/qa/questions?product_id=${product_id}&count=100&page=1`;

  try {
    let cached = await Question.findOne({ where: { product_id } });
    if (cached) {
      return cached.dataValues;
    }
    const data = await fetchData(url);
    await insertOrUpdate(Question, product_id, data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getProduct,
  getProducts,
  getReview,
  getRelated,
  getQuestions,
};
