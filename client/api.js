import axios from 'axios';
import ls from 'local-storage';

const { github_token, campus } = require('./env/config.js');

const headers = {
  headers: {
    Authorization: `${github_token}`,
  },
};

const cache = (key, id, value) => {
  let obj = ls.get(key) || {};
  obj[id] = value;
  ls.set(key, obj);
};

const getCache = (key, id) => {
  let obj = ls.get(key) || {};
  return obj[id];
};

const host = `https://app-hrsei-api.herokuapp.com/api/fec2/${campus}`;

const api = {
  /******************************************************************************
   * Product
   ******************************************************************************/

  // Parameter	Type	Description
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.
  getProducts: function (params = {}) {
    const { page = 1, count = 5 } = params;
    return axios
      .get(host + `/products?page=${page}&count=${count}`, headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  getMultipleProducts: function (params = {}) {
    const { product_ids } = params;
    if (!product_ids) {
      return Promise.reject(new Error('must provide product_id'));
    }
    let promises = product_ids.map((id) => this.getProduct({ product_id: id }));
    return Promise.all(promises);
  },

  // Parameter	Type	Description
  // product_id	integer	Required ID of the Product requested
  getProduct: function (params = {}) {
    const { product_id } = params;
    if (!product_id) {
      return Promise.reject(new Error('must provide product_id'));
    }

    return axios
      .get(host + '/products/' + product_id, headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Parameter	Type	Description
  // product_id	integer	Required ID of the Product requested
  getProductStyles: function (params = {}) {
    const { product_id } = params;
    if (!product_id) {
      return Promise.reject(new Error('must provide product_id'));
    }

    return axios
      .get(host + '/products/' + product_id + '/styles', headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Parameter	Type	Description
  // product_id	integer	Required ID of the Product requested
  getRelatedProducts: function (params = {}) {
    const { product_id } = params;
    if (!product_id) {
      return Promise.reject(new Error('must provide product_id'));
    }

    return axios
      .get(host + '/products/' + product_id + '/related', headers)
      .then((res) => this.getMultipleProducts({ product_ids: res.data }))
      .catch((err) => Promise.reject(new Error(err)));
  },

  getProductData: async function (params = {}) {
    const { product_id } = params;
    let productUrl = host + '/products/' + product_id;
    let stylesUrl = host + '/products/' + product_id + '/styles';
    try {
      let cachedProduct = getCache('product', product_id);
      if (cachedProduct) {
        return cachedProduct;
      }
      let productRes = await axios.get(productUrl, headers);
      let obj = productRes.data;
      let stylesRes = await axios.get(stylesUrl, headers);
      obj.styles = stylesRes.data.results;
      cache('product', product_id, obj);
      return obj;
    } catch (err) {
      throw new Error(err);
    }
  },

  getRelatedProductData: async function (params = {}) {
    const { product_id } = params;
    let relatedUrl = host + '/products/' + product_id + '/related';
    try {
      let obj = {};
      let related = getCache('related', product_id);
      if (!related) {
        let res = await axios.get(relatedUrl, headers);
        cache('related', product_id, res.data);
        related = res.data;
      }
      obj.related_product_ids = related;
      obj.related = [];
      related.forEach(async (product_id) => {
        let temp = await this.getProductData({ product_id });
        obj.related.push(temp);
      });

      return obj;
    } catch (err) {
      throw new Error(err);
    }
  },

  /******************************************************************************
   * Ratings and Reviews
   ******************************************************************************/
  // Returns a list of reviews for a particular product. This list does not include any reported reviews.
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.
  // sort	text	Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
  // product_id	integer	Specifies the product for which to retrieve reviews.
  // TODO - implement CACHING for getReviews
  getReviews: function (params = {}) {
    const { product_id, count = 5, page = 1, sort = 'newest' } = params;
    if (!product_id) {
      return Promise.reject(new Error('must provide product_id'));
    }

    const url = `/reviews?product_id=${product_id}&count=${count}&page=${page}&sort=${sort}`;

    return axios
      .get(host + url, headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Returns review metadata for a given product.
  // product_id	integer	Required ID of the product for which data should be returned
  getReviewMeta: function (params = {}) {
    const { product_id } = params;
    if (!product_id) {
      return Promise.reject(new Error('must provide product_id'));
    }

    return axios
      .get(host + '/reviews/meta?product_id=' + product_id, headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  getReviewData: async function (params = {}, useCache = true) {
    const { product_id, count = 5, page = 1, sort = 'newest' } = params;

    try {
      if (useCache === true) {
        let cachedReviews = getCache('reviews', product_id);
        if (cachedReviews) {
          return cachedReviews;
        }
      }
      let data = await this.getReviewMeta({ product_id });
      let reviews = await this.getReviews(params);
      data.reviews = reviews.results;
      data.numReviews = reviews.results.length;
      cache('reviews', product_id, data);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
  // product_id	integer	Required ID of the product to post the review for
  // rating	int	Integer (1-5) indicating the review rating
  // summary	text	Summary text of the review
  // body	text	Continued or full text of the review
  // recommend	bool	Value indicating if the reviewer recommends the product
  // name	text	Username for question asker
  // email	text	Email address for question asker
  // photos	[text]	Array of text urls that link to images to be shown
  // characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}

  addReview: function (params = {}) {
    if (Object.keys(params).length !== 9) {
      return Promise.reject(
        new Error('params must contain exactly 9 properties')
      );
    }

    const url = host + '/reviews';

    return axios
      .post(url, params, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Updates a review to show it was found helpful.
  // Parameter	Type	Description
  // reveiw_id	integer	Required ID of the review to update
  markReviewAsHelpful: function (params = {}) {
    const { review_id } = params;
    if (!review_id) {
      return Promise.reject(new Error('params must contain {review_id}'));
    }
    let url = `${host}/reviews/${review_id}/helpful`;

    return axios
      .put(url, {}, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.
  // Parameter	Type	Description
  // review_id	integer	Required ID of the review to update

  reportReview: function (params = {}) {
    const { review_id } = params;
    if (!review_id) {
      return Promise.reject(new Error('params must contain {review_id}'));
    }
    let url = `${host}/reviews/${review_id}/report`;

    return axios
      .put(url, {}, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  /******************************************************************************
   * Questions and Answers
   ******************************************************************************/

  // GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.
  // Parameter	Type	Description
  // product_id	integer	Specifies the product for which to retrieve questions.
  // page	integer	Selects the page of results to return. Default 1.
  // count	integer	Specifies how many results per page to return. Default 5.

  getQuestions: function (params = {}) {
    const { product_id, page = 1, count = 5 } = params;
    if (!product_id) {
      return Promise.reject(new Error('must provide product_id'));
    }
    const url = `/qa/questions?product_id=${product_id}&count=${count}&page=${page}`;

    return axios
      .get(host + url, headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Returns answers for a given question. This list does not include any reported answers.
  // GET /qa/questions/:question_id/answers
  // Parameter	Type	Description
  // question_id	integer	Required ID of the question for wich answers are needed

  getAnswers: function (params = {}) {
    const { question_id } = params;
    if (!question_id) {
      return Promise.reject(new Error('must provide a question_id'));
    }

    return axios
      .get(host + '/qa/questions/' + question_id + '/answers', headers)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(new Error(err)));
  },

  //Adds a question for the given product
  // Parameter	Type	Description
  // body	text	Text of question being asked
  // name	text	Username for question asker
  // email	text	Email address for question asker
  // product_id	integer	Required ID of the Product for which the question is posted

  addQuestion: function (params = {}) {
    const { body, name, email, product_id } = params;
    if (
      !body ||
      !name ||
      !email ||
      !product_id ||
      Object.keys(params).length !== 4
    ) {
      return Promise.reject(
        new Error('params must contain only {body, name, email, product_id}')
      );
    }

    const url = host + '/qa/questions';

    return axios
      .post(url, params, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Adds an answer for the given question
  // Parameter	Type	Description
  // body	text	Text of question being asked
  // name	text	Username for question asker
  // email	text	Email address for question asker
  // photos	[text]	An array of urls corresponding to images to display

  addAnswer: function (params = {}) {
    const { question_id, body, name, email, photos } = params;
    if (
      !question_id ||
      !body ||
      !name ||
      !email ||
      !photos ||
      Object.keys(params).length !== 5
    ) {
      return Promise.reject(
        new Error(
          'params must contain only {question_id, body, name, email, photos}'
        )
      );
    }
    let url = `${host}/qa/questions/${question_id}/answers`;
    delete params.question_id;
    return axios
      .post(url, params, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Updates a question to show it was found helpful.
  // Parameter	Type	Description
  // question_id	integer	Required ID of the question to update
  markQuestionAsHelpful: function (params = {}) {
    const { question_id } = params;
    if (!question_id) {
      return Promise.reject(new Error('params must contain {question_id}'));
    }
    let url = `${host}/qa/questions/${question_id}/helpful`;

    return axios
      .put(url, {}, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
  // Parameter	Type	Description
  // question_id	integer	Required ID of the question to update
  reportQuestion: function (params = {}) {
    const { question_id } = params;
    if (!question_id) {
      return Promise.reject(new Error('params must contain {question_id}'));
    }
    let url = `${host}/qa/questions/${question_id}/report`;
    return axios
      .put(url, {}, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Updates an answer to show it was found helpful.
  // Parameter	Type	Description
  // answer_id	integer	Required ID of the answer to update
  markAnswerAsHelpful: function (params = {}) {
    const { answer_id } = params;
    if (!answer_id) {
      return Promise.reject(new Error('params must contain {answer_id}'));
    }
    let url = `${host}/qa/answers/${answer_id}/helpful`;
    return axios
      .put(url, {}, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  // Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
  // Parameter	Type	Description
  // answer_id	integer	Required ID of the answer to update
  reportAnswer: function (params = {}) {
    const { answer_id } = params;
    if (!answer_id) {
      return Promise.reject(new Error('params must contain {answer_id}'));
    }
    let url = `${host}/qa/answers/${answer_id}/report`;
    return axios
      .put(url, {}, headers)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(new Error(err)));
  },

  /******************************************************************************
   * Interactions
   ******************************************************************************/

  /******************************************************************************
   * SHOPPING CART
   ******************************************************************************/

  // TODO -- Shopping Cart API appears to be broke - fix this
  // Retrieves list of products added to the cart by a user.
  // getCart: function () {
  //   return axios.get(host + '/cart', headers)
  //     .then(res => Promise.resolve(res.data))
  //     .catch(err => Promise.reject(new Error(err)));
  // },

  // addToCart: function (params = {}) {
  //   const { sku_id } = params;
  //   if (!sku_id) return Promise.reject(new Error('params must contain {sku_id}'));

  //   return axios.post(host + '/cart', params, headers)
  //     .then(res => Promise.resolve(res.data))
  //     .catch(err => Promise.reject(new Error(err)));
  // }
};

export default api;
