const { getProduct, getProducts, getReview, getRelated, getQuestions } = require('./fetch.js');
const { sequelize, Product, Review, Related, Question } = require('./db');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetch = async () => {
  for (let product_id = 37311; product_id < 37400; product_id++) {
    await getProduct({ product_id });
    await getReview({ product_id });
    await getRelated({ product_id });
    await getQuestions({ product_id });
    await await sleep(30000);
  }

  sequelize.close();
};

fetch();
